package com.app.cliente.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.cliente.model.dto.AtualizarClienteRequest;
import com.app.cliente.model.dto.CriarClienteRequest;
import com.app.cliente.model.entity.Cliente;
import com.app.cliente.model.entity.Endereco;
import com.app.cliente.repository.ClienteRepository;
import com.app.cliente.repository.EnderecoRepository;
import com.app.pedido.repository.PedidoRepository;
import com.app.usuario.model.entity.Usuario;
import com.app.util.FormatadorUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;
    private final PedidoRepository pedidoRepository;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;

    public ClienteService(
            ClienteRepository clienteRepository,
            EnderecoRepository enderecoRepository,
            PedidoRepository pedidoRepository,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider
    ) {
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
        this.pedidoRepository = pedidoRepository;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
    }

    public List<Cliente> listarTodos() {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return clienteRepository.findAllByUsuarioId(usuario.getId());
    }

    public Cliente buscarPorId(Integer id) {
        return encontrarCliente(id);
    }

    @Transactional
    public Cliente salvar(CriarClienteRequest request) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();

        Endereco endereco = new Endereco();
        endereco.setRua(request.endereco().rua());
        endereco.setNumero(request.endereco().numero());
        endereco.setBairro(request.endereco().bairro());
        endereco.setCidade(request.endereco().cidade());
        endereco.setEstado(request.endereco().estado());
        endereco.setCep(FormatadorUtils.removerFormatacaoCep(request.endereco().cep()));
        enderecoRepository.save(endereco);

        Cliente cliente = new Cliente();
        cliente.setNome(request.nome());
        cliente.setCnpj(FormatadorUtils.removerFormatacaoCnpj(request.cnpj()));
        cliente.setTelefone(FormatadorUtils.removerFormatacaoTelefone(request.telefone()));
        cliente.setEmail(request.email());
        cliente.setExigeNotaFiscal(request.exigeNotaFiscal() != null ? request.exigeNotaFiscal() : false);
        cliente.setEndereco(endereco);
        cliente.setUsuario(usuario);

        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente atualizar(Integer id, AtualizarClienteRequest request) {
        Cliente cliente = encontrarCliente(id);

        if (request.nome() != null) cliente.setNome(request.nome());
        if (request.telefone() != null) cliente.setTelefone(FormatadorUtils.removerFormatacaoTelefone(request.telefone()));
        if (request.email() != null) cliente.setEmail(request.email());
        if (request.exigeNotaFiscal() != null) cliente.setExigeNotaFiscal(request.exigeNotaFiscal());
        if (request.ativo() != null) cliente.setAtivo(request.ativo());

        if (request.endereco() != null) {
            Endereco endereco = cliente.getEndereco();
            if (request.endereco().rua() != null) endereco.setRua(request.endereco().rua());
            if (request.endereco().numero() != null) endereco.setNumero(request.endereco().numero());
            if (request.endereco().bairro() != null) endereco.setBairro(request.endereco().bairro());
            if (request.endereco().cidade() != null) endereco.setCidade(request.endereco().cidade());
            if (request.endereco().estado() != null) endereco.setEstado(request.endereco().estado());
            if (request.endereco().cep() != null) endereco.setCep(FormatadorUtils.removerFormatacaoCep(request.endereco().cep()));
        }

        return clienteRepository.save(cliente);
    }

    @Transactional
    public void deletar(Integer id) {
        Cliente cliente = encontrarCliente(id);

        if (pedidoRepository.existsByClienteId(cliente.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente vinculado a um pedido não pode ser deletado");
        }

        Endereco endereco = cliente.getEndereco();
        clienteRepository.delete(cliente);
        enderecoRepository.delete(endereco);
    }

    private Cliente encontrarCliente(Integer id) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return clienteRepository.findByUsuarioIdAndId(usuario.getId(), id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public List<Cliente> listarTodosClientesAtivos() {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        return clienteRepository.findAllByUsuarioIdAndAtivoIsTrue(usuario.getId());
    }
}
