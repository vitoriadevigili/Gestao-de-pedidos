package com.app.cliente.repository;

import com.app.cliente.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    List<Cliente> findAllByUsuarioId(Integer usuarioId);

    Optional<Cliente> findByUsuarioIdAndId(Integer usuarioId, Integer id);

    List<Cliente> findAllByUsuarioIdAndAtivoIsTrue(Integer usuarioId);
}
