package com.app.dashboard.model.dto;

import java.math.BigDecimal;

public record CardsResumoResponse(
        BigDecimal faturamentoTotal,
        Double crescimentoFaturamento,
        Long pedidosPeriodo,
        Double crescimentoPedidos,
        Long clientesAtivos,
        Long crescimentoClientesAtivos
) {
}
