package com.app.dashboard.service;

import com.app.auth.security.UsuarioAutenticadoProvider;
import com.app.dashboard.model.dto.CardsResumoResponse;
import com.app.dashboard.model.dto.PontoEvolucaoResponse;
import com.app.dashboard.model.dto.ProdutoMaisVendidoResponse;
import com.app.dashboard.model.dto.UltimoPedidoResponse;
import com.app.pedido.model.entity.Pedido;
import com.app.pedido.model.entity.ProdutoPedido;
import com.app.pedido.repository.PedidoRepository;
import com.app.pedido.repository.ProdutoPedidoRepository;
import com.app.pedido.specification.PedidoSpecification;
import com.app.usuario.model.entity.Usuario;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class DashboardService {

    private static final int LIMITE_ULTIMOS_PEDIDOS = 10;
    private static final int LIMITE_TOP_PRODUTOS = 3;
    private static final DateTimeFormatter FORMATO_MES = DateTimeFormatter.ofPattern("yyyy-MM");
    private static final DateTimeFormatter FORMATO_DIA = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final PedidoRepository pedidoRepository;
    private final ProdutoPedidoRepository produtoPedidoRepository;
    private final UsuarioAutenticadoProvider usuarioAutenticadoProvider;

    public DashboardService(
            PedidoRepository pedidoRepository,
            ProdutoPedidoRepository produtoPedidoRepository,
            UsuarioAutenticadoProvider usuarioAutenticadoProvider
    ) {
        this.pedidoRepository = pedidoRepository;
        this.produtoPedidoRepository = produtoPedidoRepository;
        this.usuarioAutenticadoProvider = usuarioAutenticadoProvider;
    }

    public CardsResumoResponse buscarCardsResumo(LocalDate dataInicial, LocalDate dataFinal, Integer clienteId) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        LocalDate[] periodoAtual = resolverPeriodo(dataInicial, dataFinal);
        LocalDate[] periodoAnterior = resolverPeriodoAnterior(periodoAtual[0], periodoAtual[1]);

        List<Pedido> pedidosAtual = pedidoRepository.findAll(
                PedidoSpecification.comFiltros(usuario.getId(), periodoAtual[0], periodoAtual[1], clienteId));
        List<Pedido> pedidosAnterior = pedidoRepository.findAll(
                PedidoSpecification.comFiltros(usuario.getId(), periodoAnterior[0], periodoAnterior[1], clienteId));

        BigDecimal faturamentoAtual = somarFaturamento(pedidosAtual);
        BigDecimal faturamentoAnterior = somarFaturamento(pedidosAnterior);

        long pedidosPeriodo = pedidosAtual.size();
        long pedidosAnteriorQtd = pedidosAnterior.size();

        long clientesAtivos = contarClientesDistintos(pedidosAtual);
        long clientesAtivosAnterior = contarClientesDistintos(pedidosAnterior);

        return new CardsResumoResponse(
                faturamentoAtual,
                calcularCrescimentoPercentual(faturamentoAtual, faturamentoAnterior),
                pedidosPeriodo,
                calcularCrescimentoPercentual(BigDecimal.valueOf(pedidosPeriodo), BigDecimal.valueOf(pedidosAnteriorQtd)),
                clientesAtivos,
                clientesAtivos - clientesAtivosAnterior
        );
    }

    public List<PontoEvolucaoResponse> buscarEvolucao(LocalDate dataInicial, LocalDate dataFinal, Integer clienteId) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        LocalDate[] periodo = resolverPeriodo(dataInicial, dataFinal);

        List<Pedido> pedidos = pedidoRepository.findAll(
                PedidoSpecification.comFiltros(usuario.getId(), periodo[0], periodo[1], clienteId));

        boolean agruparPorMes = ChronoUnit.DAYS.between(periodo[0], periodo[1]) > 30;
        DateTimeFormatter formato = agruparPorMes ? FORMATO_MES : FORMATO_DIA;

        Map<String, BigDecimal> agrupado = new TreeMap<>();
        for (Pedido pedido : pedidos) {
            String chave = pedido.getData().format(formato);
            agrupado.merge(chave, pedido.getValorTotal(), BigDecimal::add);
        }

        return gerarChavesPeriodo(periodo[0], periodo[1], agruparPorMes).stream()
                .map(data -> data.format(formato))
                .map(chave -> new PontoEvolucaoResponse(chave, agrupado.getOrDefault(chave, BigDecimal.ZERO)))
                .toList();
    }

    private List<LocalDate> gerarChavesPeriodo(LocalDate inicio, LocalDate fim, boolean agruparPorMes) {
        List<LocalDate> chaves = new ArrayList<>();

        if (agruparPorMes) {
            LocalDate cursor = inicio.with(TemporalAdjusters.firstDayOfMonth());
            LocalDate limite = fim.with(TemporalAdjusters.firstDayOfMonth());
            while (!cursor.isAfter(limite)) {
                chaves.add(cursor);
                cursor = cursor.plusMonths(1);
            }
        } else {
            LocalDate cursor = inicio;
            while (!cursor.isAfter(fim)) {
                chaves.add(cursor);
                cursor = cursor.plusDays(1);
            }
        }

        return chaves;
    }

    public List<UltimoPedidoResponse> buscarUltimosPedidos(LocalDate dataInicial, LocalDate dataFinal, Integer clienteId) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        LocalDate[] periodo = resolverPeriodo(dataInicial, dataFinal);

        List<Pedido> pedidos = pedidoRepository.findAll(
                PedidoSpecification.comFiltros(usuario.getId(), periodo[0], periodo[1], clienteId));

        return pedidos.stream()
                .sorted(Comparator.comparing(Pedido::getData).reversed())
                .limit(LIMITE_ULTIMOS_PEDIDOS)
                .map(pedido -> new UltimoPedidoResponse(
                        pedido.getId(),
                        pedido.getCliente().getNome(),
                        pedido.getData(),
                        pedido.getValorTotal()
                ))
                .toList();
    }

    public List<ProdutoMaisVendidoResponse> buscarTopProdutos(LocalDate dataInicial, LocalDate dataFinal, Integer clienteId) {
        Usuario usuario = usuarioAutenticadoProvider.obterUsuarioAutenticado();
        LocalDate[] periodo = resolverPeriodo(dataInicial, dataFinal);

        List<Pedido> pedidos = pedidoRepository.findAll(
                PedidoSpecification.comFiltros(usuario.getId(), periodo[0], periodo[1], clienteId));

        Map<String, Long> quantidadePorProduto = new LinkedHashMap<>();
        for (Pedido pedido : pedidos) {
            for (ProdutoPedido item : produtoPedidoRepository.findAllByPedidoId(pedido.getId())) {
                quantidadePorProduto.merge(item.getProduto().getNome(), (long) item.getQuantidade(), Long::sum);
            }
        }

        return quantidadePorProduto.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(LIMITE_TOP_PRODUTOS)
                .map(entry -> new ProdutoMaisVendidoResponse(entry.getKey(), entry.getValue()))
                .toList();
    }

    private LocalDate[] resolverPeriodo(LocalDate dataInicial, LocalDate dataFinal) {
        if (dataInicial != null && dataFinal != null) {
            return new LocalDate[]{dataInicial, dataFinal};
        }
        LocalDate hoje = LocalDate.now();
        return new LocalDate[]{hoje.with(TemporalAdjusters.firstDayOfMonth()), hoje};
    }

    private LocalDate[] resolverPeriodoAnterior(LocalDate inicio, LocalDate fim) {
        long duracaoDias = ChronoUnit.DAYS.between(inicio, fim) + 1;
        LocalDate fimAnterior = inicio.minusDays(1);
        LocalDate inicioAnterior = fimAnterior.minusDays(duracaoDias - 1);
        return new LocalDate[]{inicioAnterior, fimAnterior};
    }

    private BigDecimal somarFaturamento(List<Pedido> pedidos) {
        return pedidos.stream()
                .map(Pedido::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private long contarClientesDistintos(List<Pedido> pedidos) {
        return pedidos.stream()
                .map(pedido -> pedido.getCliente().getId())
                .distinct()
                .count();
    }

    private Double calcularCrescimentoPercentual(BigDecimal atual, BigDecimal anterior) {
        if (anterior.compareTo(BigDecimal.ZERO) == 0) {
            return atual.compareTo(BigDecimal.ZERO) > 0 ? 100.0 : 0.0;
        }
        return atual.subtract(anterior)
                .divide(anterior, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .doubleValue();
    }

}
