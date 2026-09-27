import { Pipe, PipeTransform } from '@angular/core';

const FORMATADOR_BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

@Pipe({
  name: 'moeda',
  standalone: true,
})
export class MoedaPipe implements PipeTransform {
  public transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    return FORMATADOR_BRL.format(value);
  }
}
