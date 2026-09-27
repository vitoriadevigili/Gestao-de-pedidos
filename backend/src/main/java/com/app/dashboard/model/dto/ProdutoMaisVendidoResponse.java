package com.app.dashboard.model.dto;

public record ProdutoMaisVendidoResponse(
        String nomeProduto,
        Long quantidadeVendida
) {
}
