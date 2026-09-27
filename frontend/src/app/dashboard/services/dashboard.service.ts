import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CardsResumo,
  FiltroDashboard,
  PontoEvolucao,
  ProdutoMaisVendido,
  UltimoPedido,
} from '../models/dashboard.model';

@Service()
export class DashboardService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/dashboard`;

  public buscarCardsResumo(filtro: FiltroDashboard): Observable<CardsResumo> {
    return this.http.get<CardsResumo>(`${this.BASE_URL}/cards-resumo`, {
      params: this.paraParams(filtro),
    });
  }

  public buscarEvolucao(filtro: FiltroDashboard): Observable<Array<PontoEvolucao>> {
    return this.http.get<Array<PontoEvolucao>>(`${this.BASE_URL}/evolucao`, {
      params: this.paraParams(filtro),
    });
  }

  public buscarUltimosPedidos(filtro: FiltroDashboard): Observable<Array<UltimoPedido>> {
    return this.http.get<Array<UltimoPedido>>(`${this.BASE_URL}/ultimos-pedidos`, {
      params: this.paraParams(filtro),
    });
  }

  public buscarTopProdutos(filtro: FiltroDashboard): Observable<Array<ProdutoMaisVendido>> {
    return this.http.get<Array<ProdutoMaisVendido>>(`${this.BASE_URL}/top-produtos`, {
      params: this.paraParams(filtro),
    });
  }

  private paraParams(filtro: FiltroDashboard): HttpParams {
    let params = new HttpParams();

    if (filtro.dataInicial) {
      params = params.set('dataInicial', filtro.dataInicial);
    }
    if (filtro.dataFinal) {
      params = params.set('dataFinal', filtro.dataFinal);
    }

    return params;
  }
}
