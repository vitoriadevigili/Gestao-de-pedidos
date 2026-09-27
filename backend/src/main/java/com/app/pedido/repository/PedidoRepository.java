package com.app.pedido.repository;

import com.app.pedido.model.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>, JpaSpecificationExecutor<Pedido> {

    List<Pedido> findAllByUsuarioId(Integer usuarioId);

    Optional<Pedido> findByUsuarioIdAndId(Integer usuarioId, Integer id);

    boolean existsByClienteId(Integer clienteId);
}
