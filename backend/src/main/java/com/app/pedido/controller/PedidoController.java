package com.app.pedido.controller;

import com.app.pedido.model.dto.AtualizarPedidoRequest;
import com.app.pedido.model.dto.CriarPedidoRequest;
import com.app.pedido.model.dto.ItemPedidoResponse;
import com.app.pedido.model.dto.PedidoResponse;
import com.app.pedido.model.entity.Pedido;
import com.app.pedido.model.entity.ProdutoPedido;
import com.app.pedido.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> listarTodos() {
        List<Pedido> pedidoList = pedidoService.listarTodos();
        List<PedidoResponse> pedidoResponseList = pedidoList.stream().map(this::toResponse).toList();
        return ResponseEntity.ok(pedidoResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> buscarPorId(@PathVariable Integer id) {
        Pedido pedido = pedidoService.buscarPorId(id);
        return ResponseEntity.ok(toResponse(pedido));
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> criar(@RequestBody @Valid CriarPedidoRequest pedido) {
        Pedido pedidoNovo = pedidoService.salvar(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(pedidoNovo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoResponse> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid AtualizarPedidoRequest pedido
    ) {
        Pedido atualizado = pedidoService.atualizar(id, pedido);
        return ResponseEntity.ok(toResponse(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        pedidoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    private PedidoResponse toResponse(Pedido pedido) {
        List<ProdutoPedido> produtoPedidoList = pedidoService.listarItens(pedido.getId());
        List<ItemPedidoResponse> itemResponseList = produtoPedidoList.stream()
                .map(item -> new ItemPedidoResponse(
                        item.getProduto().getId(),
                        item.getProduto().getNome(),
                        item.getQuantidade(),
                        item.getValorUnitario()
                ))
                .toList();

        return new PedidoResponse(
                pedido.getId(),
                pedido.getData(),
                pedido.getValorTotal(),
                pedido.getCliente().getId(),
                pedido.getCliente().getNome(),
                itemResponseList
        );
    }
}
