import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import {
  PedidoFormComponent,
  PedidoFormValor,
} from '../../components/pedido-form/pedido-form.component';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-adicionar-pedido',
  imports: [ButtonDirective, MessageModule, PedidoFormComponent],
  templateUrl: './adicionar-pedido.component.html',
  styleUrl: './adicionar-pedido.component.scss',
})
export class AdicionarPedidoComponent {
  private pedidoService = inject(PedidoService);
  private router = inject(Router);

  protected salvando = signal(false);
  protected erro = signal(false);

  protected salvar(pedido: PedidoFormValor): void {
    this.salvando.set(true);
    this.erro.set(false);

    this.pedidoService
      .criar({ clienteId: pedido.clienteId, data: pedido.data, itens: pedido.itens })
      .subscribe({
        next: () => this.router.navigate(['/pedidos']),
        error: () => {
          this.salvando.set(false);
          this.erro.set(true);
        },
      });
  }

  protected cancelar(): void {
    this.router.navigate(['/pedidos']);
  }
}
