package com.app.dashboard.model.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record UltimoPedidoResponse(
        Integer id,
        String nomeCliente,
        LocalDate data,
        BigDecimal valorTotal
) {
}
