import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { disabled, email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { AtualizarPerfilRequest, Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

interface PerfilFormData {
  nome: string;
  email: string;
  senhaAtual: string;
  novaSenha: string;
}

const PERFIL_VAZIO: PerfilFormData = { nome: '', email: '', senhaAtual: '', novaSenha: '' };

function paraFormData(usuario: Usuario): PerfilFormData {
  return { nome: usuario.nome, email: usuario.email, senhaAtual: '', novaSenha: '' };
}

@Component({
  selector: 'app-perfil',
  imports: [
    ButtonDirective,
    CardModule,
    InputTextModule,
    LabelModule,
    MessageModule,
    PasswordModule,
    FormField,
    FormRoot,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected carregando = signal(true);
  protected erroCarregar = signal(false);
  protected editando = signal(false);
  protected salvando = signal(false);
  protected saindo = signal(false);

  private usuario = signal<Usuario | null>(null);
  private model = signal<PerfilFormData>(structuredClone(PERFIL_VAZIO));

  protected perfilForm = form(this.model, (schema) => {
    required(schema.nome, { message: 'Nome deve ser informado' });
    required(schema.email, { message: 'E-mail deve ser informado' });
    email(schema.email, { message: 'E-mail deve ser válido' });
    minLength(schema.novaSenha, 6, {
      message: 'Nova senha deve ter no mínimo 6 caracteres',
      when: (ctx) => ctx.value().length > 0,
    });
    required(schema.senhaAtual, {
      message: 'Informe a senha atual para alterar a senha',
      when: (ctx) => ctx.valueOf(schema.novaSenha).length > 0,
    });
    disabled(schema, { when: () => !this.editando() });
  });

  public ngOnInit(): void {
    this.usuarioService.obterPerfil().subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.model.set(paraFormData(usuario));
        this.carregando.set(false);
      },
      error: () => {
        this.erroCarregar.set(true);
        this.carregando.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados do perfil.',
        });
      },
    });
  }

  protected editar(): void {
    this.editando.set(true);
  }

  protected cancelar(): void {
    const usuario = this.usuario();
    if (usuario) {
      this.perfilForm().reset(paraFormData(usuario));
    }
    this.editando.set(false);
  }

  protected sair(): void {
    this.saindo.set(true);

    // mesmo que a chamada ao backend falhe, o token local é descartado
    this.authService
      .sair()
      .pipe(finalize(() => this.saindo.set(false)))
      .subscribe({
        next: () => this.encerrarSessao(),
        error: () => this.encerrarSessao(),
      });
  }

  private encerrarSessao(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  protected excluir(): void {
    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message:
        'Deseja realmente excluir sua conta? Todos os seus clientes, produtos e pedidos também serão excluídos. Esta ação não pode ser desfeita.',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.usuarioService.excluirConta().subscribe({
          next: () => this.encerrarSessao(),
          error: (erro: unknown) => {
            const corpo =
              erro instanceof HttpErrorResponse ? (erro.error as ApiErrorResponse) : undefined;

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: corpo?.message ?? 'Não foi possível excluir a conta. Tente novamente.',
            });
          },
        });
      },
    });
  }

  protected salvar(): void {
    const estadoForm = this.perfilForm();

    if (estadoForm.invalid()) {
      estadoForm.markAsTouched();
      return;
    }

    const dados = estadoForm.value();
    const perfil: AtualizarPerfilRequest = {
      nome: dados.nome,
      email: dados.email,
      ...(dados.novaSenha ? { senhaAtual: dados.senhaAtual, novaSenha: dados.novaSenha } : {}),
    };

    this.salvando.set(true);

    this.usuarioService.atualizarPerfil(perfil).subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.perfilForm().reset(paraFormData(usuario));
        this.salvando.set(false);
        this.editando.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Perfil atualizado com sucesso.',
        });
      },
      error: () => {
        this.salvando.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível salvar as alterações. Tente novamente.',
        });
      },
    });
  }
}
