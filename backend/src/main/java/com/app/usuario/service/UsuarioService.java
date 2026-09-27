package com.app.usuario.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.cliente.repository.ClienteRepository;
import com.app.cliente.repository.EnderecoRepository;
import com.app.pedido.repository.PedidoRepository;
import com.app.pedido.repository.ProdutoPedidoRepository;
import com.app.produto.repository.ProdutoRepository;
import com.app.usuario.model.dto.AtualizarPerfilRequest;
import com.app.usuario.model.entity.Usuario;
import com.app.usuario.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;
    private final ProdutoPedidoRepository produtoPedidoRepository;
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;
    private final ProdutoRepository produtoRepository;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider,
            ProdutoPedidoRepository produtoPedidoRepository,
            PedidoRepository pedidoRepository,
            ClienteRepository clienteRepository,
            EnderecoRepository enderecoRepository,
            ProdutoRepository produtoRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
        this.produtoPedidoRepository = produtoPedidoRepository;
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
        this.produtoRepository = produtoRepository;
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

    @Transactional
    public void excluirConta() {
        Integer usuarioId = usuarioAutenticadoProvider.obterUsuarioAutenticado().getId();

        produtoPedidoRepository.deleteAllByUsuarioId(usuarioId);
        pedidoRepository.deleteAllByUsuarioId(usuarioId);

        List<Integer> enderecoIds = clienteRepository.findEnderecoIdsByUsuarioId(usuarioId);
        clienteRepository.deleteAllByUsuarioId(usuarioId);
        enderecoRepository.deleteAllByIdInBatch(enderecoIds);

        produtoRepository.deleteAllByUsuarioId(usuarioId);
        usuarioRepository.deleteById(usuarioId);
    }

}
