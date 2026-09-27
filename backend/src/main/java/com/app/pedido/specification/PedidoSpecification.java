package com.app.pedido.specification;

import com.app.pedido.model.entity.Pedido;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class PedidoSpecification {

    private PedidoSpecification() {
    }

    public static Specification<Pedido> comFiltros(
            Integer usuarioId,
            LocalDate dataInicial,
            LocalDate dataFinal,
            Integer clienteId
    ) {
        return (root, query, builder) -> {
            var predicado = builder.conjunction();

            predicado = builder.and(predicado, builder.equal(root.get("usuario").get("id"), usuarioId));

            if (dataInicial != null && dataFinal != null) {
                predicado = builder.and(predicado, builder.between(root.get("data"), dataInicial, dataFinal));
            }

            if (clienteId != null) {
                predicado = builder.and(predicado, builder.equal(root.get("cliente").get("id"), clienteId));
            }

            return predicado;
        };
    }
}
