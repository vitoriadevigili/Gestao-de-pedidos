import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ViaCepResponse } from '../models/via-cep-response.model';

const BASE_URL = 'https://viacep.com.br/ws';

@Service()
export class ViaCepService {
  private http = inject(HttpClient);

  public buscarEndereco(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`${BASE_URL}/${cep}/json/`);
  }
}
