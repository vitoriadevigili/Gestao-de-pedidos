export interface CardsResumo {
  faturamentoTotal: number;
  crescimentoFaturamento: number;
  pedidosPeriodo: number;
  crescimentoPedidos: number;
  clientesAtivos: number;
  crescimentoClientesAtivos: number;
}

export interface PontoEvolucao {
  periodo: string;
  faturamento: number;
}

export interface UltimoPedido {
  id: number;
  nomeCliente: string;
  data: string;
  valorTotal: number;
}

export interface ProdutoMaisVendido {
  nomeProduto: string;
  quantidadeVendida: number;
}

export interface FiltroDashboard {
  dataInicial?: string;
  dataFinal?: string;
}
