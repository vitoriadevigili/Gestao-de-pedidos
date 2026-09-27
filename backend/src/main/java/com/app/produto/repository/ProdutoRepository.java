package com.app.produto.repository;

import com.app.produto.model.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    List<Produto> findAllByUsuarioId(Integer usuarioId);

    Optional<Produto> findByUsuarioIdAndId(Integer usuarioId, Integer id);

    List<Produto> findAllByUsuarioIdAndAtivoIsTrue(Integer usuarioId);

    @Modifying
    @Query("delete from Produto p where p.usuario.id = :usuarioId")
    void deleteAllByUsuarioId(@Param("usuarioId") Integer usuarioId);
}
