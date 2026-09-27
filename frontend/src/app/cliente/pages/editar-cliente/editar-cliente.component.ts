import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';
import { Cliente, ClienteRequest } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  imports: [ButtonDirective, MessageModule, ClienteFormComponent],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss',
})
export class EditarClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected clienteForm = viewChild(ClienteFormComponent);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  protected cliente = signal<Cliente | null>(null);
  protected carregando = signal(true);
  protected salvando = signal(false);

  public ngOnInit(): void {
    this.clienteService.buscar(this.id).subscribe((cliente) => {
      this.cliente.set(cliente ?? null);
      this.carregando.set(false);
    });
  }

  protected salvar(cliente: ClienteRequest): void {
    this.salvando.set(true);

    this.clienteService.atualizar(this.id, cliente).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (erro) => {
        this.salvando.set(false);
        this.clienteForm()?.aplicarErroServidor(erro);
      },
    });
  }

  protected cancelar(): void {
    this.router.navigate(['/clientes', this.id]);
  }
}
