import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtualizarPedidoRequest, CriarPedidoRequest, Pedido } from '../models/pedido.model';

@Service()
export class PedidoService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/pedidos`;

  public listar(): Observable<Array<Pedido>> {
    return this.http.get<Array<Pedido>>(this.BASE_URL);
  }

  public buscar(id: number): Observable<Pedido | undefined> {
    return this.http.get<Pedido>(`${this.BASE_URL}/${id}`);
  }

  public criar(pedido: CriarPedidoRequest): Observable<Pedido> {
    return this.http.post<Pedido>(this.BASE_URL, pedido);
  }

  public atualizar(id: number, pedido: AtualizarPedidoRequest): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.BASE_URL}/${id}`, pedido);
  }

  public deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
