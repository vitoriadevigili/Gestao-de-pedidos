package com.app.auth.security;

import com.app.usuario.model.entity.Usuario;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UsuarioAutenticadoProvider {

    public Usuario obterUsuarioAutenticado() {
        UsuarioDetails usuarioDetails = (UsuarioDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return usuarioDetails.getUsuario();
    }
}
