package com.app.cliente.model.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AtualizarEnderecoRequest(
        @Size(max = 255, message = "Rua deve ter no máximo 255 caracteres")
        String rua,

        Integer numero,

        @Size(max = 255, message = "Bairro deve ter no máximo 255 caracteres")
        String bairro,

        @Size(max = 255, message = "Cidade deve ter no máximo 255 caracteres")
        String cidade,

        @Size(max = 50, message = "Estado deve ter no máximo 50 caracteres")
        String estado,

        @Pattern(
                regexp = "^\\d{8}$",
                message = "CEP deve conter exatamente 8 números"
        )
        String cep

) {
}
