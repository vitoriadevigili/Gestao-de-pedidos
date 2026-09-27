package com.app.cliente.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record AtualizarClienteRequest(

        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @Pattern(regexp = "^\\d{10,11}$", message = "Telefone deve conter entre 10 e 11 números")
        String telefone,

        @Email(message = "Email inválido")
        @Size(max = 150)
        String email,

        Boolean exigeNotaFiscal,

        @Valid
        AtualizarEnderecoRequest endereco,

        Boolean ativo
) {
}
