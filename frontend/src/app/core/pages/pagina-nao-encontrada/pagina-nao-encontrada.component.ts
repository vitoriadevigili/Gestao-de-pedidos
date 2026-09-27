import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-pagina-nao-encontrada',
  imports: [RouterLink, ButtonDirective],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.scss',
})
export class PaginaNaoEncontradaComponent {}
