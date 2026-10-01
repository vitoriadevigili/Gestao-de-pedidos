import { Component, computed, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { disabled, FormField, FormRoot, form, minLength, required } from '@angular/forms/signals';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Cliente } from '../../../cliente/models/cliente.model';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { MoedaPipe } from '../../../core/pipes/moeda.pipe';
import { Produto } from '../../../produto/models/produto.model';
import { ProdutoService } from '../../../produto/services/produto.service';
import {
  ItemPedidoFormComponent,
  ItemPedidoFormModel,
} from '../item-pedido-form/item-pedido-form.component';
import { ItemPedidoRequest, Pedido } from '../../models/pedido.model';

interface PedidoFormModel {
  clienteId: number | null;
  data: Date;
  itens: ItemPedidoFormModel[];
}

export interface PedidoFormValor {
  clienteId: number;
  data: string;
  itens: ItemPedidoRequest[];
}

function criarPedidoVazio(): PedidoFormModel {
  return { clienteId: null, data: new Date(), itens: [] };
}

function paraData(iso: string): Date {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

function paraIso(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

@Component({
  selector: 'app-pedido-form',
  imports: [
    FormField,
    FormRoot,
    ButtonDirective,
    CardModule,
    DatePickerModule,
    DialogModule,
    MessageModule,
    SelectModule,
    TableModule,
    MoedaPipe,
    ItemPedidoFormComponent,
  ],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.scss',
})
export class PedidoFormComponent {
  private clienteService = inject(ClienteService);
  private produtoService = inject(ProdutoService);

  public pedido = input<Pedido | null>(null);
  public somenteLeitura = input<boolean>(false);

  public salvar = output<PedidoFormValor>();

  protected itemForm = viewChild(ItemPedidoFormComponent);

  protected clientes = signal<Cliente[]>([]);
  protected produtos = signal<Produto[]>([]);

  protected emEdicao = computed(() => this.pedido() !== null);

  protected pedidoModel = signal<PedidoFormModel>(criarPedidoVazio());

  protected pedidoForm = form(this.pedidoModel, (schema) => {
    required(schema.clienteId);
    required(schema.data);
    minLength(schema.itens, 1);

    disabled(schema.clienteId, { when: () => this.emEdicao() });
    disabled(schema.data, { when: () => this.emEdicao() });
    disabled(schema, { when: () => this.somenteLeitura() });
  });

  protected valorTotal = computed(() =>
    this.pedidoModel().itens.reduce((soma, item) => soma + item.quantidade * item.valorUnitario, 0),
  );

  protected itemModalAberto = signal(false);
  protected itemSelecionadoIndice = signal<number | null>(null);
  protected itemSelecionado = computed(() => {
    const indice = this.itemSelecionadoIndice();
    return indice !== null ? this.pedidoModel().itens[indice] : null;
  });

  protected produtosDisponiveis = computed(() => {
    const produtoIdEmEdicao = this.itemSelecionado()?.produtoId ?? null;
    const produtoIdsNoPedido = new Set(
      this.pedidoModel()
        .itens.map((item) => item.produtoId)
        .filter((produtoId) => produtoId !== produtoIdEmEdicao),
    );
    return this.produtos().filter((produto) => !produtoIdsNoPedido.has(produto.id));
  });

  constructor() {
    effect(() => {
      if (this.emEdicao()) {
        this.clienteService.listar().subscribe((clientes) => this.clientes.set(clientes));
        this.produtoService.listar().subscribe((produtos) => this.produtos.set(produtos));
      } else {
        this.clienteService.listarAtivos().subscribe((clientes) => this.clientes.set(clientes));
        this.produtoService.listarAtivos().subscribe((produtos) => this.produtos.set(produtos));
      }
    });

    effect(() => {
      const pedido = this.pedido();
      if (pedido) {
        this.pedidoModel.set({
          clienteId: pedido.clienteId,
          data: paraData(pedido.data),
          itens: pedido.itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            valorUnitario: item.valorUnitario,
          })),
        });
      }
    });
  }

  protected subtotalItem(indice: number): number {
    const item = this.pedidoModel().itens[indice];
    return item ? item.quantidade * item.valorUnitario : 0;
  }

  protected produtoNome(produtoId: number | null): string {
    return this.produtos().find((produto) => produto.id === produtoId)?.nome ?? '';
  }

  protected abrirNovoItem(): void {
    this.itemSelecionadoIndice.set(null);
    this.itemModalAberto.set(true);
  }

  protected abrirEdicaoItem(indice: number): void {
    this.itemSelecionadoIndice.set(indice);
    this.itemModalAberto.set(true);
  }

  protected fecharModalItem(): void {
    this.itemModalAberto.set(false);
    this.itemSelecionadoIndice.set(null);
  }

  protected salvarItem(item: ItemPedidoFormModel): void {
    const indice = this.itemSelecionadoIndice();

    this.pedidoModel.update((modelo) => ({
      ...modelo,
      itens:
        indice !== null
          ? modelo.itens.map((atual, i) => (i === indice ? item : atual))
          : [...modelo.itens, item],
    }));

    this.itemModalAberto.set(false);
    this.itemSelecionadoIndice.set(null);
  }

  protected removerItem(indice: number): void {
    this.pedidoModel.update((modelo) => ({
      ...modelo,
      itens: modelo.itens.filter((_, i) => i !== indice),
    }));
  }

  public submit(): void {
    this.onSubmit();
  }

  protected onSubmit(): void {
    const estadoForm = this.pedidoForm();

    if (this.somenteLeitura() || estadoForm.invalid()) {
      estadoForm.markAsTouched();
      return;
    }

    const valor = estadoForm.value();

    this.salvar.emit({
      clienteId: valor.clienteId!,
      data: paraIso(valor.data),
      itens: valor.itens.map((item) => ({
        produtoId: item.produtoId!,
        quantidade: item.quantidade,
        valorUnitario: item.valorUnitario,
      })),
    });
  }
}
