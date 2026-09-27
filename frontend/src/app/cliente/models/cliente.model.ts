import { Endereco } from './endereco.model';

export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  exigeNotaFiscal: boolean;
  ativo: boolean;
  endereco: Endereco;
}

export type ClienteRequest = Omit<Cliente, 'id'>;
