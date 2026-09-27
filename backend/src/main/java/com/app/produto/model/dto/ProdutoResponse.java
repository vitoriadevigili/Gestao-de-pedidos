package com.app.produto.model.dto;

import java.math.BigDecimal;

public record ProdutoResponse(
        Integer id,
        String nome,
        BigDecimal valorBase,
        Boolean ativo
) {
}
