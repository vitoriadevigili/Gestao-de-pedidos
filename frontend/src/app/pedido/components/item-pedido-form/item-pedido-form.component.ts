import { Component, effect, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, min, required } from '@angular/forms/signals';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Produto } from '../../../produto/models/produto.model';

export interface ItemPedidoFormModel {
  produtoId: number | null;
  quantidade: number;
  valorUnitario: number;
}

function criarItemVazio(): ItemPedidoFormModel {
  return { produtoId: null, quantidade: 1, valorUnitario: 0 };
}

@Component({
  selector: 'app-item-pedido-form',
  imports: [FormField, FormRoot, InputNumberModule, MessageModule, SelectModule],
  templateUrl: './item-pedido-form.component.html',
  styleUrl: './item-pedido-form.component.scss',
})
export class ItemPedidoFormComponent {
  public item = input<ItemPedidoFormModel | null>(null);
  public produtos = input<Produto[]>([]);

  public salvar = output<ItemPedidoFormModel>();

  protected itemModel = signal<ItemPedidoFormModel>(criarItemVazio());

  protected itemForm = form(this.itemModel, (schema) => {
    required(schema.produtoId);
    required(schema.quantidade);
    min(schema.quantidade, 1);
    required(schema.valorUnitario);
    min(schema.valorUnitario, 0.01);
  });

  constructor() {
    effect(() => {
      const item = this.item();
      this.itemModel.set(item ? { ...item } : criarItemVazio());
    });
  }

  protected onProdutoAlterado(produtoId: number): void {
    const produto = this.produtos().find((p) => p.id === produtoId);
    if (!produto) {
      return;
    }

    this.itemModel.update((modelo) => ({ ...modelo, valorUnitario: produto.valorBase }));
  }

  public submit(): void {
    this.onSubmit();
  }

  protected onSubmit(): void {
    const estadoForm = this.itemForm();

    if (estadoForm.invalid()) {
      estadoForm.markAsTouched();
      return;
    }

    const valor = estadoForm.value();

    this.salvar.emit({
      produtoId: valor.produtoId!,
      quantidade: valor.quantidade,
      valorUnitario: valor.valorUnitario,
    });
  }
}
