import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CadastroRequest } from '../models/cadastro-request.model';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

const TOKEN_KEY = 'gestao-pedidos:token';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private BASE_URL = `${environment.api.url}/auth`;

  public cadastrar(data: CadastroRequest): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/cadastro`, data);
  }

  public login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, data);
  }

  public salvarToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  public obterToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public estaAutenticado(): boolean {
    const token = this.obterToken();

    if (!token) {
      return false;
    }

    const expiracao = this.obterExpiracaoToken(token);

    if (!expiracao) {
      return false;
    }

    return Date.now() < expiracao;
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  private obterExpiracaoToken(token: string): number | null {
    try {
      const payload = token.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      const { exp } = JSON.parse(json) as { exp?: number };

      return exp ? exp * 1000 : null;
    } catch {
      return null;
    }
  }
}
