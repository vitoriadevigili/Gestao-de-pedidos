import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AtualizarPerfilRequest, Usuario } from '../models/usuario.model';

@Service()
export class UsuarioService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/usuario`;

  public obterPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.BASE_URL}/perfil`);
  }

  public atualizarPerfil(perfil: AtualizarPerfilRequest): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.BASE_URL}/perfil`, perfil);
  }
}
