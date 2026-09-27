package com.app.pedido.model.dto;

import java.math.BigDecimal;

public record ItemPedidoResponse(
        Integer produtoId,
        String nomeProduto,
        Integer quantidade,
        BigDecimal valorUnitario
) {
}
