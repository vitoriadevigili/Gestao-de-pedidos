package com.app.cliente.controller;

import com.app.cliente.model.dto.AtualizarClienteRequest;
import com.app.cliente.model.dto.ClienteResponse;
import com.app.cliente.model.dto.CriarClienteRequest;
import com.app.cliente.model.dto.EnderecoResponse;
import com.app.cliente.model.entity.Cliente;
import com.app.cliente.model.entity.Endereco;
import com.app.cliente.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteResponse>> listarTodos() {
        List<Cliente> clienteList = clienteService.listarTodos();
        List<ClienteResponse> clienteResponseList = clienteList.stream().map(this::toResponse).toList();
        return ResponseEntity.ok(clienteResponseList);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ClienteResponse>> listarTodosClientesAtivos() {
        List<Cliente> clienteList = clienteService.listarTodosClientesAtivos();
        List<ClienteResponse> clienteResponseList = clienteList.stream().map(this::toResponse).toList();
        return ResponseEntity.ok(clienteResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponse> buscarPorId(@PathVariable Integer id) {
        Cliente cliente = clienteService.buscarPorId(id);
        return ResponseEntity.ok(toResponse(cliente));
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> criar(@RequestBody @Valid CriarClienteRequest cliente) {
        Cliente clienteNovo = clienteService.salvar(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(clienteNovo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> atualizar(
            @PathVariable Integer id,
            @RequestBody @Valid AtualizarClienteRequest cliente
    ) {
        Cliente atualizado = clienteService.atualizar(id, cliente);
        return ResponseEntity.ok(toResponse(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    private ClienteResponse toResponse(Cliente cliente) {
        Endereco e = cliente.getEndereco();
        EnderecoResponse enderecoResponse = new EnderecoResponse(
                e.getId(), e.getRua(), e.getNumero(), e.getBairro(),
                e.getCidade(), e.getEstado(), e.getCep()
        );
        return new ClienteResponse(
                cliente.getId(),
                cliente.getNome(),
                cliente.getCnpj(),
                cliente.getTelefone(),
                cliente.getEmail(),
                cliente.getExigeNotaFiscal(),
                cliente.getAtivo(),
                enderecoResponse
        );
    }
}
