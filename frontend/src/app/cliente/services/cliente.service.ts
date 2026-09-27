import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente, ClienteRequest } from '../models/cliente.model';

@Service()
export class ClienteService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/clientes`;

  public listar(): Observable<Array<Cliente>> {
    return this.http.get<Array<Cliente>>(this.BASE_URL);
  }

  public listarAtivos(): Observable<Array<Cliente>> {
    return this.http.get<Array<Cliente>>(`${this.BASE_URL}/ativos`);
  }

  public buscar(id: number): Observable<Cliente | undefined> {
    return this.http.get<Cliente>(`${this.BASE_URL}/${id}`);
  }

  public criar(cliente: ClienteRequest): Observable<Cliente> {
    return this.http.post<Cliente>(this.BASE_URL, cliente);
  }

  public atualizar(id: number, cliente: ClienteRequest): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.BASE_URL}/${id}`, cliente);
  }

  public deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
