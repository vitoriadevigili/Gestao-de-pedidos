package com.app.pedido.repository;

import com.app.pedido.model.entity.ProdutoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoPedidoRepository extends JpaRepository<ProdutoPedido, Integer> {

    List<ProdutoPedido> findAllByPedidoId(Integer pedidoId);

    Optional<ProdutoPedido> findByPedidoIdAndProdutoId(Integer pedidoId, Integer produtoId);

    boolean existsByProdutoId(Integer produtoId);

    void deleteAllByPedidoId(Integer pedidoId);

    @Modifying
    @Query("""
            delete from ProdutoPedido pp
            where pp.pedido.id in (select p.id from Pedido p where p.usuario.id = :usuarioId)
               or pp.produto.id in (select pr.id from Produto pr where pr.usuario.id = :usuarioId)
            """)
    void deleteAllByUsuarioId(@Param("usuarioId") Integer usuarioId);
}
