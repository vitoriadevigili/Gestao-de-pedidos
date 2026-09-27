import { Pipe, PipeTransform } from '@angular/core';

const PADRAO_CNPJ = /^([A-Z\d]{2})([A-Z\d]{3})([A-Z\d]{3})([A-Z\d]{4})(\d{2})$/;

@Pipe({
  name: 'cnpj',
  standalone: true,
})
export class CnpjPipe implements PipeTransform {
  public transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const caracteres = value.replace(/[^A-Za-z\d]/g, '').toUpperCase();

    if (caracteres.length !== 14 || !PADRAO_CNPJ.test(caracteres)) {
      return value;
    }

    return caracteres.replace(PADRAO_CNPJ, '$1.$2.$3/$4-$5');
  }
}
