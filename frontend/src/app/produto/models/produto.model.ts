export interface Produto {
  id: number;
  nome: string;
  valorBase: number;
  ativo: boolean;
}

export type ProdutoRequest = Omit<Produto, 'id'>;
