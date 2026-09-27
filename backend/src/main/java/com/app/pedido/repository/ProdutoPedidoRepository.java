package com.app.pedido.repository;

import com.app.pedido.model.entity.ProdutoPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoPedidoRepository extends JpaRepository<ProdutoPedido, Integer> {

    List<ProdutoPedido> findAllByPedidoId(Integer pedidoId);

    Optional<ProdutoPedido> findByPedidoIdAndProdutoId(Integer pedidoId, Integer produtoId);

    boolean existsByProdutoId(Integer produtoId);

    void deleteAllByPedidoId(Integer pedidoId);
}
