package com.app.dashboard.model.dto;

import java.math.BigDecimal;

public record PontoEvolucaoResponse(
        String periodo,
        BigDecimal faturamento
) {
}
