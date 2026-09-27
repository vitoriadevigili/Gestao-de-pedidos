export interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  quantidade: number;
  valorUnitario: number;
}

export interface Pedido {
  id: number;
  data: string;
  valorTotal: number;
  clienteId: number;
  nomeCliente: string;
  itens: ItemPedido[];
}

export interface ItemPedidoRequest {
  produtoId: number;
  valorUnitario: number;
  quantidade: number;
}

export interface CriarPedidoRequest {
  clienteId: number;
  data: string;
  itens: ItemPedidoRequest[];
}

export interface AtualizarPedidoRequest {
  itens: ItemPedidoRequest[];
}
