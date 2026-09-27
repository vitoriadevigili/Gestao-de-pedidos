import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import type { TagSeverity } from 'primeng/tag';
import { TagModule } from 'primeng/tag';
import { ApiErrorResponse } from '../../../core/models/api-error.model';
import { MoedaPipe } from '../../../core/pipes/moeda.pipe';
import { ProdutoFormComponent } from '../../components/produto-form/produto-form.component';
import { Produto, ProdutoRequest } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-lista-produto',
  imports: [
    ButtonDirective,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    MessageModule,
    MoedaPipe,
    ProdutoFormComponent,
  ],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.scss',
})
export class ListaProdutoComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  protected produtoForm = viewChild(ProdutoFormComponent);

  protected produtos = signal<Produto[]>([]);

  protected modalAberto = signal(false);
  protected produtoSelecionado = signal<Produto | null>(null);
  protected salvando = signal(false);
  protected erro = signal(false);

  public ngOnInit(): void {
    this.buscar();
  }

  public buscar(): void {
    this.produtoService.listar().subscribe((produtos) => {
      this.produtos.set(produtos);
    });
  }

  protected abrirNovo(): void {
    this.produtoSelecionado.set(null);
    this.erro.set(false);
    this.modalAberto.set(true);
  }

  protected abrirEdicao(produto: Produto): void {
    this.produtoSelecionado.set(produto);
    this.erro.set(false);
    this.modalAberto.set(true);
  }

  protected fecharModal(): void {
    this.modalAberto.set(false);
    this.salvando.set(false);
    this.erro.set(false);
  }

  protected salvar(produto: ProdutoRequest): void {
    this.salvando.set(true);
    this.erro.set(false);

    const produtoSelecionado = this.produtoSelecionado();
    const requisicao = produtoSelecionado
      ? this.produtoService.atualizar(produtoSelecionado.id, produto)
      : this.produtoService.criar(produto);

    requisicao.subscribe({
      next: () => {
        this.salvando.set(false);
        this.modalAberto.set(false);
        this.buscar();
      },
      error: () => {
        this.salvando.set(false);
        this.erro.set(true);
      },
    });
  }

  protected labelAtivo(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }

  protected severityAtivo(ativo: boolean): TagSeverity {
    return ativo ? 'success' : 'warn';
  }

  protected deletar(produto: Produto): void {
    this.confirmationService.confirm({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir o produto ${produto.nome}?`,
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', outlined: true },
      accept: () => {
        this.produtoService.deletar(produto.id).subscribe({
          next: () => {
            this.buscar();
          },
          error: (erro: unknown) => {
            const corpo =
              erro instanceof HttpErrorResponse ? (erro.error as ApiErrorResponse) : undefined;

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: corpo?.message ?? 'Não foi possível excluir o produto. Tente novamente.',
            });
          },
        });
      },
    });
  }
}
