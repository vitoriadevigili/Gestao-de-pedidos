import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { MoedaPipe } from '../../../core/pipes/moeda.pipe';
import {
  CardsResumo,
  PontoEvolucao,
  ProdutoMaisVendido,
  UltimoPedido,
} from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

const NOME_MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const QTD_MESES_EVOLUCAO = 6;

const QTD_ULTIMOS_PEDIDOS = 5;

const ABREVIACAO_MESES = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function paraIso(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function primeiroDiaMesAtual(): Date {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth(), 1);
}

function ultimoDiaMesAtual(): Date {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
}

function primeiroDiaMesesAtras(qtdMeses: number): Date {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth() - (qtdMeses - 1), 1);
}

@Component({
  selector: 'app-dashboard',
  imports: [ButtonDirective, ChartModule, DatePickerModule, DatePipe, FormsModule, MoedaPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  protected dataInicial = signal<Date | null>(primeiroDiaMesAtual());
  protected dataFinal = signal<Date | null>(ultimoDiaMesAtual());

  protected cardsResumo = signal<CardsResumo | null>(null);
  protected evolucao = signal<PontoEvolucao[]>([]);
  protected ultimosPedidos = signal<UltimoPedido[]>([]);
  protected topProdutos = signal<ProdutoMaisVendido[]>([]);

  protected chartData = signal<any>(null);
  protected chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  protected periodoLabel = signal<string>('');

  public ngOnInit(): void {
    this.atualizarPeriodoLabel();
    this.buscar();
    this.buscarEvolucao();
  }

  protected filtrar(): void {
    this.atualizarPeriodoLabel();
    this.buscar();
  }

  protected limparFiltro(): void {
    this.dataInicial.set(primeiroDiaMesAtual());
    this.dataFinal.set(ultimoDiaMesAtual());
    this.atualizarPeriodoLabel();
    this.buscar();
  }

  protected verTodosPedidos(): void {
    this.router.navigate(['/pedidos']);
  }

  private buscar(): void {
    const filtro = {
      dataInicial: this.dataInicial() ? paraIso(this.dataInicial()!) : undefined,
      dataFinal: this.dataFinal() ? paraIso(this.dataFinal()!) : undefined,
    };

    this.dashboardService
      .buscarCardsResumo(filtro)
      .subscribe((cards) => this.cardsResumo.set(cards));

    this.dashboardService
      .buscarUltimosPedidos(filtro)
      .subscribe((ultimosPedidos) =>
        this.ultimosPedidos.set(ultimosPedidos.slice(0, QTD_ULTIMOS_PEDIDOS)),
      );

    this.dashboardService
      .buscarTopProdutos(filtro)
      .subscribe((topProdutos) => this.topProdutos.set(topProdutos));
  }

  private buscarEvolucao(): void {
    const filtro = {
      dataInicial: paraIso(primeiroDiaMesesAtras(QTD_MESES_EVOLUCAO)),
      dataFinal: paraIso(ultimoDiaMesAtual()),
    };

    this.dashboardService.buscarEvolucao(filtro).subscribe((evolucao) => {
      this.evolucao.set(evolucao);
      this.montarChart(evolucao);
    });
  }

  private montarChart(evolucao: PontoEvolucao[]): void {
    this.chartData.set({
      labels: evolucao.map((ponto) => this.formatarPeriodo(ponto.periodo)),
      datasets: [
        {
          label: 'Faturamento',
          data: evolucao.map((ponto) => ponto.faturamento),
          fill: true,
          tension: 0.4,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    });
  }

  private formatarPeriodo(periodo: string): string {
    if (periodo.length === 7) {
      const [, mes] = periodo.split('-').map(Number);
      return ABREVIACAO_MESES[mes - 1];
    }

    const [, mes, dia] = periodo.split('-');
    return `${dia}/${mes}`;
  }

  private atualizarPeriodoLabel(): void {
    const inicio = this.dataInicial();
    const fim = this.dataFinal();

    if (this.ehMesAtualCompleto(inicio, fim)) {
      const hoje = new Date();
      this.periodoLabel.set(`${NOME_MESES[hoje.getMonth()]} ${hoje.getFullYear()}`);
      return;
    }

    const formatar = (data: Date) =>
      `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`;
    this.periodoLabel.set(`${inicio ? formatar(inicio) : '...'} a ${fim ? formatar(fim) : '...'}`);
  }

  private ehMesAtualCompleto(inicio: Date | null, fim: Date | null): boolean {
    if (!inicio || !fim) return false;
    const primeiroDia = primeiroDiaMesAtual();
    const ultimoDia = ultimoDiaMesAtual();
    return paraIso(inicio) === paraIso(primeiroDia) && paraIso(fim) === paraIso(ultimoDia);
  }

  protected sinalCrescimento(valor: number | undefined | null): 'positivo' | 'negativo' | 'neutro' {
    if (!valor) return 'neutro';
    return valor > 0 ? 'positivo' : 'negativo';
  }

  protected iconeCrescimento(valor: number | undefined | null): string {
    return this.sinalCrescimento(valor) === 'negativo' ? 'arrow_downward' : 'arrow_upward';
  }

  protected formatarPercentual(valor: number | undefined | null): string {
    const numero = valor ?? 0;
    return `${numero > 0 ? '+' : ''}${numero.toFixed(1)}%`;
  }

  protected formatarCrescimentoClientes(valor: number | undefined | null): string {
    const numero = valor ?? 0;
    if (numero > 0) return `+${numero} novos`;
    if (numero < 0) return `${Math.abs(numero)} a menos`;
    return 'sem variação';
  }
}
