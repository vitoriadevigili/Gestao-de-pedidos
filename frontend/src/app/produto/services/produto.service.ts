import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Produto, ProdutoRequest } from '../models/produto.model';

@Service()
export class ProdutoService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/produtos`;

  public listar(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(this.BASE_URL);
  }

  public listarAtivos(): Observable<Array<Produto>> {
    return this.http.get<Array<Produto>>(`${this.BASE_URL}/ativos`);
  }

  public buscar(id: number): Observable<Produto | undefined> {
    return this.http.get<Produto>(`${this.BASE_URL}/${id}`);
  }

  public criar(produto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.BASE_URL, produto);
  }

  public atualizar(id: number, produto: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.BASE_URL}/${id}`, produto);
  }

  public deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
