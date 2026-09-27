package com.app.pedido.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.cliente.model.entity.Cliente;
import com.app.cliente.repository.ClienteRepository;
import com.app.pedido.model.dto.AtualizarPedidoRequest;
import com.app.pedido.model.dto.CriarPedidoRequest;
import com.app.pedido.model.dto.ItemPedidoRequest;
import com.app.pedido.model.entity.Pedido;
import com.app.pedido.model.entity.ProdutoPedido;
import com.app.pedido.repository.PedidoRepository;
import com.app.pedido.repository.ProdutoPedidoRepository;
import com.app.produto.model.entity.Produto;
import com.app.produto.repository.ProdutoRepository;
import com.app.usuario.model.entity.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoPedidoRepository produtoPedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;

    public PedidoService(
            PedidoRepository pedidoRepository,
            ProdutoPedidoRepository produtoPedidoRepository,
            ClienteRepository clienteRepository,
            ProdutoRepository produtoRepository,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider
    ) {
        this.pedidoRepository = pedidoRepository;
        this.produtoPedidoRepository = produtoPedidoRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
    }

    public List<Pedido> listarTodos() {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return pedidoRepository.findAllByUsuarioId(usuario.getId());
    }

    public Pedido buscarPorId(Integer id) {
        return encontrarPedido(id);
    }

    @Transactional
    public Pedido salvar(CriarPedidoRequest request) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();

        Cliente cliente = clienteRepository.findByUsuarioIdAndId(usuario.getId(), request.clienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        if (cliente.estaInativo())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente está inativo");

        Pedido pedido = new Pedido();
        pedido.setData(request.data());
        pedido.setCliente(cliente);
        pedido.setUsuario(usuario);
        pedidoRepository.save(pedido);

        BigDecimal valorTotal = criarItens(pedido, request.itens(), usuario);
        pedido.setValorTotal(valorTotal);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido atualizar(Integer id, AtualizarPedidoRequest request) {
        Pedido pedido = encontrarPedido(id);
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();

        if (request.itens() != null && !request.itens().isEmpty()) {
            for (ItemPedidoRequest item : request.itens()) {
                ProdutoPedido produtoPedido = produtoPedidoRepository.findByPedidoIdAndProdutoId(pedido.getId(), item.produtoId())
                        .orElse(new ProdutoPedido());

                Produto produto = produtoRepository.findByUsuarioIdAndId(usuario.getId(), item.produtoId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));

                produtoPedido.setPedido(pedido);
                produtoPedido.setProduto(produto);
                produtoPedido.setQuantidade(item.quantidade());
                produtoPedido.setValorUnitario(item.valorUnitario());
                produtoPedidoRepository.save(produtoPedido);
            }
            List<ProdutoPedido> produtoPedidoList = produtoPedidoRepository.findAllByPedidoId(pedido.getId());
            BigDecimal valorTotal = calcularValorTotalPedido(produtoPedidoList);
            pedido.setValorTotal(valorTotal);
        }
        return pedidoRepository.save(pedido);
    }

    private BigDecimal calcularValorTotalPedido(List<ProdutoPedido> produtoPedidoList) {
        return produtoPedidoList.stream()
                .map(ProdutoPedido::calcularValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Transactional
    public void deletar(Integer id) {
        Pedido pedido = encontrarPedido(id);
        produtoPedidoRepository.deleteAllByPedidoId(pedido.getId());
        pedidoRepository.delete(pedido);
    }

    public List<ProdutoPedido> listarItens(Integer pedidoId) {
        return produtoPedidoRepository.findAllByPedidoId(pedidoId);
    }

    private BigDecimal criarItens(Pedido pedido, List<ItemPedidoRequest> itens, Usuario usuario) {
        if (existeItemDuplicado(itens)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Não é permitido incluir o mesmo produto mais de uma vez no pedido");
        }

        BigDecimal valorTotal = BigDecimal.ZERO;

        for (ItemPedidoRequest item : itens) {
            Produto produto = produtoRepository.findByUsuarioIdAndId(usuario.getId(), item.produtoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));

            ProdutoPedido produtoPedido = new ProdutoPedido();
            produtoPedido.setPedido(pedido);
            produtoPedido.setProduto(produto);
            produtoPedido.setQuantidade(item.quantidade());
            produtoPedido.setValorUnitario(item.valorUnitario());
            produtoPedidoRepository.save(produtoPedido);

            valorTotal = valorTotal.add(item.valorUnitario().multiply(BigDecimal.valueOf(item.quantidade())));
        }

        return valorTotal;
    }

    private boolean existeItemDuplicado(List<ItemPedidoRequest> itens) {
        long produtosDistintos = itens.stream().map(ItemPedidoRequest::produtoId).distinct().count();

        if (produtosDistintos < itens.size()) {
            return true;
        }
        return false;
    }

    private Pedido encontrarPedido(Integer id) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return pedidoRepository.findByUsuarioIdAndId(usuario.getId(), id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
    }

}
