import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MoedaPipe } from '../../../core/pipes/moeda.pipe';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-lista-pedido',
  imports: [
    ButtonDirective,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DatePipe,
    MoedaPipe,
  ],
  templateUrl: './lista-pedido.component.html',
  styleUrl: './lista-pedido.component.scss',
})
export class ListaPedidoComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  protected pedidos = signal<Pedido[]>([]);

  public ngOnInit(): void {
    this.buscar();
  }

  public buscar(): void {
    this.pedidoService.listar().subscribe((pedidos) => {
      this.pedidos.set(pedidos);
    });
  }

  protected visualizar(pedido: Pedido): void {
    this.router.navigate(['/pedidos', pedido.id]);
  }

  protected editar(pedido: Pedido): void {
    this.router.navigate(['/pedidos', pedido.id, 'editar']);
  }

  protected adicionar(): void {
    this.router.navigate(['/pedidos/novo']);
  }

  protected deletar(pedido: Pedido): void {
    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o pedido #${pedido.id}?`,
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.pedidoService.deletar(pedido.id).subscribe(() => {
          this.buscar();
        });
      },
    });
  }
}
