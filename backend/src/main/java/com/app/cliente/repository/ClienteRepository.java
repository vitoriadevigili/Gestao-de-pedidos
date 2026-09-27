package com.app.cliente.repository;

import com.app.cliente.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    List<Cliente> findAllByUsuarioId(Integer usuarioId);

    Optional<Cliente> findByUsuarioIdAndId(Integer usuarioId, Integer id);

    List<Cliente> findAllByUsuarioIdAndAtivoIsTrue(Integer usuarioId);

    @Query("select c.endereco.id from Cliente c where c.usuario.id = :usuarioId")
    List<Integer> findEnderecoIdsByUsuarioId(@Param("usuarioId") Integer usuarioId);

    @Modifying
    @Query("delete from Cliente c where c.usuario.id = :usuarioId")
    void deleteAllByUsuarioId(@Param("usuarioId") Integer usuarioId);
}
