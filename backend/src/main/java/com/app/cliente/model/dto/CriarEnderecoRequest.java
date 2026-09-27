package com.app.cliente.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CriarEnderecoRequest(

        @NotBlank(message = "Rua é obrigatória")
        @Size(max = 255, message = "Rua deve ter no máximo 255 caracteres")
        String rua,

        @NotNull(message = "Número é obrigatório")
        Integer numero,

        @NotBlank(message = "Bairro é obrigatório")
        @Size(max = 255, message = "Bairro deve ter no máximo 255 caracteres")
        String bairro,

        @NotBlank(message = "Cidade é obrigatória")
        @Size(max = 255, message = "Cidade deve ter no máximo 255 caracteres")
        String cidade,

        @NotBlank(message = "Estado é obrigatório")
        @Size(max = 50, message = "Estado deve ter no máximo 50 caracteres")
        String estado,

        @NotBlank(message = "CEP é obrigatório")
        @Pattern(
                regexp = "^\\d{8}$",
                message = "CEP deve conter exatamente 8 números"
        )
        String cep
) {
}
