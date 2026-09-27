package com.app.pedido.model.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PedidoResponse(
        Integer id,
        LocalDate data,
        BigDecimal valorTotal,
        Integer clienteId,
        String nomeCliente,
        List<ItemPedidoResponse> itens
) {
}
