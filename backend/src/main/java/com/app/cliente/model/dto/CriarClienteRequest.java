package com.app.cliente.model.dto;

import com.app.util.validation.Cnpj;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;


public record CriarClienteRequest(

        @NotBlank(message = "Nome é obrigatório")
        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @Size(max = 14, message = "CNPJ deve ter no máximo 14 caracteres")
        @Pattern(regexp = "^[A-Za-z0-9]{12}\\d{2}$", message = "CNPJ deve conter 12 caracteres alfanuméricos seguidos de 2 dígitos verificadores")
        @Cnpj(message = "CNPJ inválido")
        String cnpj,

        @Pattern(regexp = "^\\d{10,11}$", message = "Telefone deve conter entre 10 e 11 números")
        String telefone,

        @Email(message = "Email inválido")
        @Size(max = 150)
        String email,

        @NotNull
        Boolean exigeNotaFiscal,

        @Valid
        @NotNull(message = "Endereço é obrigatório")
        CriarEnderecoRequest endereco
) {
}
