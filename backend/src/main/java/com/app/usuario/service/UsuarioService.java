package com.app.usuario.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.usuario.model.dto.AtualizarPerfilRequest;
import com.app.usuario.model.entity.Usuario;
import com.app.usuario.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
    }

    public Usuario buscarPerfil() {
        return usuarioAutenticadoProvider.obterUsuarioAutenticado();
    }

    @Transactional
    public Usuario atualizarPerfil(AtualizarPerfilRequest request) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();

        if (request.nome() != null) usuario.setNome(request.nome());

        if (request.email() != null && !request.email().equalsIgnoreCase(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(request.email())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
            }
            usuario.setEmail(request.email());
        }

        if (request.novaSenha() != null) {
            if (request.senhaAtual() == null || !passwordEncoder.matches(request.senhaAtual(), usuario.getSenha())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha atual incorreta");
            }
            usuario.setSenha(passwordEncoder.encode(request.novaSenha()));
        }

        return usuarioRepository.save(usuario);
    }

}
