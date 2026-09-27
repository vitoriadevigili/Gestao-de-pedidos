import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { ClienteFormComponent } from '../../components/cliente-form/cliente-form.component';
import { ClienteRequest } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-adicionar-cliente',
  imports: [ButtonDirective, ClienteFormComponent],
  templateUrl: './adicionar-cliente.component.html',
  styleUrl: './adicionar-cliente.component.scss',
})
export class AdicionarClienteComponent {
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  protected clienteForm = viewChild(ClienteFormComponent);

  protected salvando = signal(false);

  protected salvar(cliente: ClienteRequest): void {
    this.salvando.set(true);

    this.clienteService.criar(cliente).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (erro) => {
        this.salvando.set(false);
        this.clienteForm()?.aplicarErroServidor(erro);
      },
    });
  }

  protected cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
