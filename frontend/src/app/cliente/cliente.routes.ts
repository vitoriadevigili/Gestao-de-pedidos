import { Routes } from '@angular/router';
import { AdicionarClienteComponent } from './pages/adicionar-cliente/adicionar-cliente.component';
import { DetalheClienteComponent } from './pages/detalhe-cliente/detalhe-cliente.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { ListaClienteComponent } from './pages/lista-cliente/lista-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaClienteComponent,
  },
  {
    path: 'novo',
    component: AdicionarClienteComponent,
  },
  {
    path: ':id',
    component: DetalheClienteComponent,
  },
  {
    path: ':id/editar',
    component: EditarClienteComponent,
  },
];
