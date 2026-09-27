package com.app.pedido.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public record CriarPedidoRequest(

        @NotNull(message = "Cliente é obrigatório")
        Integer clienteId,

        @NotNull
        LocalDate data,

        @NotEmpty(message = "O pedido deve conter ao menos um item")
        @Valid
        List<ItemPedidoRequest> itens
) {
}
