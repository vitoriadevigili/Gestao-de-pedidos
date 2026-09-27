import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import type { TagSeverity } from 'primeng/tag';
import { TagModule } from 'primeng/tag';
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { CnpjPipe } from '../../../core/pipes/cnpj.pipe';
import { TelefonePipe } from '../../../core/pipes/telefone.pipe';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-lista-cliente',
  imports: [
    ButtonDirective,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TelefonePipe,
    CnpjPipe,
  ],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.scss',
})
export class ListaClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  protected clientes = signal<Cliente[]>([]);

  public ngOnInit(): void {
    this.buscar();
  }

  public buscar(): void {
    this.clienteService.listar().subscribe((clientes) => {
      this.clientes.set(clientes);
    });
  }

  protected visualizar(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }

  protected editar(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id, 'editar']);
  }

  protected adicionar(): void {
    this.router.navigate(['/clientes/novo']);
  }

  protected labelAtivo(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

  protected severityAtivo(ativo: boolean): TagSeverity {
    return ativo ? 'success' : 'warn';
  }

  protected labelExigeNotaFiscal(exigeNotaFiscal: boolean): string {
    return exigeNotaFiscal ? 'Sim' : 'Não';
  }

  protected deletar(cliente: Cliente): void {
    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o cliente ${cliente.nome}?`,
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.clienteService.deletar(cliente.id).subscribe({
          next: () => {
            this.buscar();
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
