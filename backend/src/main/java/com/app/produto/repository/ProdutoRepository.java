package com.app.produto.repository;

import com.app.produto.model.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    List<Produto> findAllByUsuarioId(Integer usuarioId);

    Optional<Produto> findByUsuarioIdAndId(Integer usuarioId, Integer id);

    List<Produto> findAllByUsuarioIdAndAtivoIsTrue(Integer usuarioId);
}
