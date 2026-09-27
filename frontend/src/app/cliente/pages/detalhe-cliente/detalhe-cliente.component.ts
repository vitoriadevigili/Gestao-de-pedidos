import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-detalhe-cliente',
  imports: [ButtonDirective, MessageModule, ClienteFormComponent],
  providers: [],
  templateUrl: './detalhe-cliente.component.html',
  styleUrl: './detalhe-cliente.component.scss',
})
export class DetalheClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  protected cliente = signal<Cliente | null>(null);
  protected carregando = signal(true);

  public ngOnInit(): void {
    this.clienteService.buscar(this.id).subscribe((cliente) => {
      this.cliente.set(cliente ?? null);
      this.carregando.set(false);
    });
  }

  protected voltar(): void {
    this.router.navigate(['/clientes']);
  }

  protected editar(): void {
    this.router.navigate(['/clientes', this.id, 'editar']);
  }

  protected excluir(): void {
    const cliente = this.cliente();
    if (!cliente) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o cliente ${cliente.nome}?`,
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.clienteService.deletar(this.id).subscribe({
          next: () => {
            this.router.navigate(['/clientes']);
          },
          error: (erro: unknown) => {
            const corpo =
              erro instanceof HttpErrorResponse ? (erro.error as ApiErrorResponse) : undefined;

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: corpo?.message ?? 'Não foi possível excluir o cliente. Tente novamente.',
            });
          },
        });
      },
    });
  }
}
