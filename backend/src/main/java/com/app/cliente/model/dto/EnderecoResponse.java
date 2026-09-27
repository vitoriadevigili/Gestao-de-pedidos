package com.app.cliente.model.dto;

public record EnderecoResponse (
        Integer id,
        String rua,
        Integer numero,
        String bairro,
        String cidade,
        String estado,
        String cep
) {
}
