package com.app.cliente.model.dto;

public record ClienteResponse (
        Integer id,
        String nome,
        String cnpj,
        String telefone,
        String email,
        Boolean exigeNotaFiscal,
        Boolean ativo,
        EnderecoResponse endereco
) {

}
