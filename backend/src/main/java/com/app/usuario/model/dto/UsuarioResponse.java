package com.app.usuario.model.dto;

public record UsuarioResponse(
        Integer id,
        String nome,
        String email
) {
}
