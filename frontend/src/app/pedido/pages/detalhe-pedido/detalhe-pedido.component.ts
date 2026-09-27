import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { PedidoFormComponent } from '../../components/pedido-form/pedido-form.component';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-detalhe-pedido',
  imports: [ButtonDirective, MessageModule, PedidoFormComponent],
  templateUrl: './detalhe-pedido.component.html',
  styleUrl: './detalhe-pedido.component.scss',
})
export class DetalhePedidoComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  private confirmationService = inject(ConfirmationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  protected pedido = signal<Pedido | null>(null);
  protected carregando = signal(true);

  public ngOnInit(): void {
    this.pedidoService.buscar(this.id).subscribe((pedido) => {
      this.pedido.set(pedido ?? null);
      this.carregando.set(false);
    });
  }

  protected voltar(): void {
    this.router.navigate(['/pedidos']);
  }

  protected editar(): void {
    this.router.navigate(['/pedidos', this.id, 'editar']);
  }

  protected excluir(): void {
    const pedido = this.pedido();
    if (!pedido) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o pedido #${pedido.id}?`,
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.pedidoService.deletar(this.id).subscribe(() => {
          this.router.navigate(['/pedidos']);
        });
      },
    });
  }
}
