import { HttpErrorResponse } from '@angular/common/http';
import {
  afterNextRender,
  Component,
  effect,
  inject,
  input,
  Injector,
  output,
  signal,
} from '@angular/core';
import {
  FormField,
  FormRoot,
  disabled,
  email,
  form,
  min,
  pattern,
  required,
} from '@angular/forms/signals';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { ViaCepService } from '../../../core/services/via-cep.service';
import { Cliente, ClienteRequest } from '../../models/cliente.model';

const CLIENTE_VAZIO: ClienteRequest = {
  nome: '',
  cnpj: '',
  email: '',
  telefone: '',
  exigeNotaFiscal: false,
  ativo: true,
  endereco: {
    cep: '',
    rua: '',
    numero: 0,
    bairro: '',
    cidade: '',
    estado: '',
  },
};

@Component({
  selector: 'app-cliente-form',
  imports: [
    FormField,
    FormRoot,
    InputTextModule,
    InputMaskModule,
    ToggleSwitchModule,
    MessageModule,
    CardModule,
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class ClienteFormComponent {
  private viaCepService = inject(ViaCepService);
  private injector = inject(Injector);
  private messageService = inject(MessageService);

  public cliente = input<Cliente | null>(null);
  public somenteLeitura = input<boolean>(false);

  public salvar = output<ClienteRequest>();

  protected buscandoCep = signal(false);
  protected erroCep = signal(false);
  protected telefoneMask = signal('(99) 99999-9999');
  protected erroServidor = signal<Record<string, string[]>>({});

  protected clienteModel = signal<ClienteRequest>(structuredClone(CLIENTE_VAZIO));

  protected clienteForm = form(this.clienteModel, (schema) => {
    required(schema.nome);
    required(schema.cnpj);
    required(schema.email);
    email(schema.email);
    required(schema.telefone);
    required(schema.endereco.cep);
    pattern(schema.endereco.cep, /^\d{8}$/);
    required(schema.endereco.rua);
    required(schema.endereco.numero);
    min(schema.endereco.numero, 1);
    required(schema.endereco.bairro);
    required(schema.endereco.cidade);
    required(schema.endereco.estado);
    disabled(schema, { when: () => this.somenteLeitura() });
  });

  constructor() {
    effect(() => {
      const cliente = this.cliente();
      if (cliente) {
        const { id: _id, ...clienteRequest } = cliente;
        const digitosTelefone = clienteRequest.telefone.replace(/\D/g, '');
        this.telefoneMask.set(digitosTelefone.length <= 10 ? '(99) 9999-9999' : '(99) 99999-9999');
        this.clienteModel.set(clienteRequest);

        // p-inputmask reseta seu proprio valor para vazio na primeira renderizacao
        // (quando a mascara é aplicada pela primeira vez) e propaga isso de volta
        // para o form. Reaplica os campos mascarados apos essa corrida terminar.
        afterNextRender(
          () => {
            this.clienteModel.update((modelo) => ({
              ...modelo,
              cnpj: clienteRequest.cnpj,
              telefone: clienteRequest.telefone,
              endereco: { ...modelo.endereco, cep: clienteRequest.endereco.cep },
            }));
          },
          { injector: this.injector },
        );
      }
    });
  }

  protected buscarCep(): void {
    const cepField = this.clienteForm.endereco.cep;
    const cep = cepField().value().replace(/\D/g, '');

    if (cepField().invalid()) {
      return;
    }

    this.buscandoCep.set(true);
    this.erroCep.set(false);

    this.viaCepService.buscarEndereco(cep).subscribe({
      next: (endereco) => {
        this.buscandoCep.set(false);

        if (endereco.erro) {
          this.erroCep.set(true);
          return;
        }

        this.clienteModel.update((modelo) => ({
          ...modelo,
          endereco: {
            ...modelo.endereco,
            rua: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.estado,
          },
        }));
      },
      error: () => {
        this.buscandoCep.set(false);
        this.erroCep.set(true);
      },
    });
  }

  public submit(): void {
    this.onSubmit();
  }

  public aplicarErroServidor(erro: unknown): void {
    const corpo = erro instanceof HttpErrorResponse ? (erro.error as ApiErrorResponse) : undefined;

    if (corpo?.errors?.length) {
      const agrupado: Record<string, string[]> = {};
      for (const erroCampo of corpo.errors) {
        (agrupado[erroCampo.field] ??= []).push(erroCampo.message);
      }

      this.erroServidor.set(agrupado);
      this.clienteForm().markAsTouched();
      return;
    }

    this.erroServidor.set({});
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: corpo?.message ?? 'Não foi possível salvar o cliente. Tente novamente.',
    });
  }

  protected onSubmit(): void {
    const estadoForm = this.clienteForm();

    if (this.somenteLeitura() || estadoForm.invalid()) {
      estadoForm.markAsTouched();
      return;
    }

    this.salvar.emit(estadoForm.value());
  }
}
