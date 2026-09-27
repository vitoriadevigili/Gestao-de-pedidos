import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/components/app-layout/app-layout.component';
import { PublicLayoutComponent } from './core/components/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './core/pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./modulos.routes').then((r) => r.routes),
  },
  { path: '**', component: PaginaNaoEncontradaComponent },
];
