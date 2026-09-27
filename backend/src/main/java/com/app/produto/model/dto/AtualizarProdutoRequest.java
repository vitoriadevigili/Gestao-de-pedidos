package com.app.produto.model.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record AtualizarProdutoRequest(

        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @DecimalMin(value = "0.0", inclusive = false, message = "Valor base deve ser maior que zero")
        BigDecimal valorBase,

        Boolean ativo
) {
}
