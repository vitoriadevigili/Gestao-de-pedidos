package com.app.pedido.model.dto;

import jakarta.validation.Valid;

import java.util.List;

public record AtualizarPedidoRequest(

        @Valid
        List<ItemPedidoRequest> itens
) {
}
