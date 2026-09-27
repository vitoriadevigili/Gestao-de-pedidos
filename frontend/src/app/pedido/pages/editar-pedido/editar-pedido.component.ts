import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import {
  PedidoFormComponent,
  PedidoFormValor,
} from '../../components/pedido-form/pedido-form.component';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-editar-pedido',
  imports: [ButtonDirective, MessageModule, PedidoFormComponent],
  templateUrl: './editar-pedido.component.html',
  styleUrl: './editar-pedido.component.scss',
})
export class EditarPedidoComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected pedidoForm = viewChild(PedidoFormComponent);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  protected pedido = signal<Pedido | null>(null);
  protected carregando = signal(true);
  protected salvando = signal(false);
  protected erro = signal(false);

  public ngOnInit(): void {
    this.pedidoService.buscar(this.id).subscribe((pedido) => {
      this.pedido.set(pedido ?? null);
      this.carregando.set(false);
    });
  }

  protected salvar(pedido: PedidoFormValor): void {
    this.salvando.set(true);
    this.erro.set(false);

    this.pedidoService.atualizar(this.id, { itens: pedido.itens }).subscribe({
      next: () => this.router.navigate(['/pedidos']),
      error: () => {
        this.salvando.set(false);
        this.erro.set(true);
      },
    });
  }

  protected cancelar(): void {
    this.router.navigate(['/pedidos', this.id]);
  }
}
