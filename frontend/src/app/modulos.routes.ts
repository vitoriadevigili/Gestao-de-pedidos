import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes').then((r) => r.routes),
  },
  {
    path: 'clientes',
    loadChildren: () => import('./cliente/cliente.routes').then((r) => r.routes),
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produto/produto.routes').then((r) => r.routes),
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedido/pedido.routes').then((r) => r.routes),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./usuario/usuario.routes').then((r) => r.routes),
  },
];
