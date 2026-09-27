package com.app.pedido.model.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NegativeOrZero;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record ItemPedidoRequest(

        @NotNull(message = "Produto é obrigatório")
        Integer produtoId,

        @Positive(message = "O valor unitário deve ser maior que zero")
        BigDecimal valorUnitario,

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser maior que zero")
        Integer quantidade
) {
}
