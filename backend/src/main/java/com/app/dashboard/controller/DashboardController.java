package com.app.dashboard.controller;

import com.app.dashboard.model.dto.CardsResumoResponse;
import com.app.dashboard.model.dto.PontoEvolucaoResponse;
import com.app.dashboard.model.dto.ProdutoMaisVendidoResponse;
import com.app.dashboard.model.dto.UltimoPedidoResponse;
import com.app.dashboard.service.DashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/cards-resumo")
    public ResponseEntity<CardsResumoResponse> buscarCardsResumo(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal,
            @RequestParam(required = false) Integer clienteId
    ) {
        return ResponseEntity.ok(dashboardService.buscarCardsResumo(dataInicial, dataFinal, clienteId));
    }

    @GetMapping("/evolucao")
    public ResponseEntity<List<PontoEvolucaoResponse>> buscarEvolucao(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal,
            @RequestParam(required = false) Integer clienteId
    ) {
        return ResponseEntity.ok(dashboardService.buscarEvolucao(dataInicial, dataFinal, clienteId));
    }

    @GetMapping("/ultimos-pedidos")
    public ResponseEntity<List<UltimoPedidoResponse>> buscarUltimosPedidos(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal,
            @RequestParam(required = false) Integer clienteId
    ) {
        return ResponseEntity.ok(dashboardService.buscarUltimosPedidos(dataInicial, dataFinal, clienteId));
    }

    @GetMapping("/top-produtos")
    public ResponseEntity<List<ProdutoMaisVendidoResponse>> buscarTopProdutos(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicial,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFinal,
            @RequestParam(required = false) Integer clienteId
    ) {
        return ResponseEntity.ok(dashboardService.buscarTopProdutos(dataInicial, dataFinal, clienteId));
    }
}
