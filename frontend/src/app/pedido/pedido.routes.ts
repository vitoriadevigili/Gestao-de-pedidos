import { Routes } from '@angular/router';
import { AdicionarPedidoComponent } from './pages/adicionar-pedido/adicionar-pedido.component';
import { DetalhePedidoComponent } from './pages/detalhe-pedido/detalhe-pedido.component';
import { EditarPedidoComponent } from './pages/editar-pedido/editar-pedido.component';
import { ListaPedidoComponent } from './pages/lista-pedido/lista-pedido.component';

export const routes: Routes = [
  {
    path: '',
    component: ListaPedidoComponent,
  },
  {
    path: 'novo',
    component: AdicionarPedidoComponent,
  },
  {
    path: ':id',
    component: DetalhePedidoComponent,
  },
  {
    path: ':id/editar',
    component: EditarPedidoComponent,
  },
];
