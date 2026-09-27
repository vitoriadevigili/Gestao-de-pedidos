package com.app.usuario.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record AtualizarPerfilRequest(

        @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
        String nome,

        @Email(message = "Email inválido")
        @Size(max = 150)
        String email,

        String senhaAtual,

        @Size(min = 8, message = "A nova senha deve ter no mínimo 8 caracteres")
        String novaSenha
) {
}
