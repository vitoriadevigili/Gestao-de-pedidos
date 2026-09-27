package com.app.produto.controller;

import com.app.produto.model.dto.AtualizarProdutoRequest;
import com.app.produto.model.dto.CriarProdutoRequest;
import com.app.produto.model.dto.ProdutoResponse;
import com.app.produto.model.entity.Produto;
import com.app.produto.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponse>> listarTodos() {
        List<Produto> produtoList = produtoService.listarTodos();
        List<ProdutoResponse> produtoResponseList = produtoList.stream().map(this::toResponse).toList();
        return ResponseEntity.ok(produtoResponseList);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ProdutoResponse>> listarTodosProdutosAtivos() {
        List<Produto> produtoList = produtoService.listarTodosProdutosAtivos();
        List<ProdutoResponse> produtoResponseList = produtoList.stream().map(this::toResponse).toList();
        return ResponseEntity.ok(produtoResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponse> buscarPorId(@PathVariable Integer id) {
        Produto produto = produtoService.buscarPorId(id);
        return ResponseEntity.ok(toResponse(produto));
    }

    @PostMapping
    public ResponseEntity<ProdutoResponse> criar(@RequestBody @Valid CriarProdutoRequest produto) {
        Produto produtoNovo = produtoService.salvar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(produtoNovo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponse> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid AtualizarProdutoRequest produto
    ) {
        Produto atualizado = produtoService.atualizar(id, produto);
        return ResponseEntity.ok(toResponse(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    private ProdutoResponse toResponse(Produto produto) {
        return new ProdutoResponse(
                produto.getId(),
                produto.getNome(),
                produto.getValorBase(),
                produto.getAtivo()
        );
    }
}
