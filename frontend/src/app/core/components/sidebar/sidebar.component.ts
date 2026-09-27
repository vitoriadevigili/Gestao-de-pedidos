import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarCollapsible, SidebarSide, SidebarVariant } from 'primeng/types/sidebar';
import { filter } from 'rxjs';

interface MenuItem {
  icon: string;
  label: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [SidebarModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  variant: SidebarVariant = 'sidebar';
  collapsible: SidebarCollapsible = 'none';

  side: SidebarSide = 'left';

  overlay: boolean = false;
  openOnHover: boolean = false;
  backdrop: boolean = false;

  private readonly router = inject(Router);

  private readonly baseItems: Omit<MenuItem, 'isActive'>[] = [
    { icon: 'dashboard', label: 'Dashboard', url: '/' },
    { icon: 'group', label: 'Clientes', url: '/clientes' },
    { icon: 'package_2', label: 'Produtos', url: '/produtos' },
    { icon: 'orders', label: 'Pedidos', url: '/pedidos' },
  ];

  private readonly baseFooterItems: Omit<MenuItem, 'isActive'>[] = [
    { icon: 'person', label: 'Perfil', url: '/perfil' },
  ];

  private readonly currentUrl = signal(this.router.url);

  protected readonly items = computed<MenuItem[]>(() => this.comItemsAtivos(this.baseItems));

  protected readonly footerItems = computed<MenuItem[]>(() =>
    this.comItemsAtivos(this.baseFooterItems),
  );

  private comItemsAtivos(itens: Omit<MenuItem, 'isActive'>[]): MenuItem[] {
    const url = this.currentUrl();
    return itens.map((item) => ({
      ...item,
      isActive: item.url === '/' ? url === '/' : url === item.url || url.startsWith(`${item.url}/`),
    }));
  }

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }
}
