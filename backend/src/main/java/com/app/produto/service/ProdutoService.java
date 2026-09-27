package com.app.produto.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.pedido.repository.ProdutoPedidoRepository;
import com.app.produto.model.dto.AtualizarProdutoRequest;
import com.app.produto.model.dto.CriarProdutoRequest;
import com.app.produto.model.entity.Produto;
import com.app.produto.repository.ProdutoRepository;
import com.app.usuario.model.entity.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ProdutoPedidoRepository produtoPedidoRepository;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;

    public ProdutoService(
            ProdutoRepository produtoRepository,
            ProdutoPedidoRepository produtoPedidoRepository,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider
    ) {
        this.produtoRepository = produtoRepository;
        this.produtoPedidoRepository = produtoPedidoRepository;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
    }

    public List<Produto> listarTodos() {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return produtoRepository.findAllByUsuarioId(usuario.getId());
    }

    public Produto buscarPorId(Integer id) {
        return encontrarProduto(id);
    }

    @Transactional
    public Produto salvar(CriarProdutoRequest request) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();

        Produto produto = new Produto();
        produto.setNome(request.nome());
        produto.setValorBase(request.valorBase());
        produto.setUsuario(usuario);

        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizar(Integer id, AtualizarProdutoRequest request) {
        Produto produto = encontrarProduto(id);

        if (request.nome() != null) produto.setNome(request.nome());
        if (request.valorBase() != null) produto.setValorBase(request.valorBase());
        if (request.ativo() != null) produto.setAtivo(request.ativo());

        return produtoRepository.save(produto);
    }

    @Transactional
    public void deletar(Integer id) {
        Produto produto = encontrarProduto(id);

        if (produtoPedidoRepository.existsByProdutoId(produto.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Produto vinculado a um pedido não pode ser deletado");
        }

        produtoRepository.delete(produto);
    }

    private Produto encontrarProduto(Integer id) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return produtoRepository.findByUsuarioIdAndId(usuario.getId(), id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public List<Produto> listarTodosProdutosAtivos() {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return produtoRepository.findAllByUsuarioIdAndAtivoIsTrue(usuario.getId());
    }
}
