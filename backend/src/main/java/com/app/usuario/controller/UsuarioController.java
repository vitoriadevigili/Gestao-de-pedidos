package com.app.usuario.controller;

import com.app.usuario.model.dto.AtualizarPerfilRequest;
import com.app.usuario.model.dto.UsuarioResponse;
import com.app.usuario.model.entity.Usuario;
import com.app.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario/perfil")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<UsuarioResponse> buscarPerfil() {
        Usuario usuario = usuarioService.buscarPerfil();
        return ResponseEntity.ok(toResponse(usuario));
    }

    @PutMapping
    public ResponseEntity<UsuarioResponse> atualizarPerfil(@RequestBody @Valid AtualizarPerfilRequest request) {
        Usuario usuario = usuarioService.atualizarPerfil(request);
        return ResponseEntity.ok(toResponse(usuario));
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
}
