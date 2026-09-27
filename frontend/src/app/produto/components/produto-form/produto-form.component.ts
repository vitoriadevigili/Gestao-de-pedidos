import { Component, effect, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, min, required } from '@angular/forms/signals';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Produto, ProdutoRequest } from '../../models/produto.model';

const PRODUTO_VAZIO: ProdutoRequest = {
  nome: '',
  valorBase: 0,
  ativo: true,
};

@Component({
  selector: 'app-produto-form',
  imports: [FormField, FormRoot, InputTextModule, InputNumberModule, ToggleSwitchModule, MessageModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent {
  public produto = input<Produto | null>(null);

  public salvar = output<ProdutoRequest>();

  protected produtoModel = signal<ProdutoRequest>(structuredClone(PRODUTO_VAZIO));

  protected produtoForm = form(this.produtoModel, (schema) => {
    required(schema.nome);
    required(schema.valorBase);
    min(schema.valorBase, 0.01);
  });

  constructor() {
    effect(() => {
      const produto = this.produto();
      if (produto) {
        const { id: _id, ...produtoRequest } = produto;
        this.produtoModel.set(produtoRequest);
      }
    });
  }

  public submit(): void {
    this.onSubmit();
  }

  protected onSubmit(): void {
    const estadoForm = this.produtoForm();

    if (estadoForm.invalid()) {
      estadoForm.markAsTouched();
      return;
    }

    this.salvar.emit(estadoForm.value());
  }
}
