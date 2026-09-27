import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
  standalone: true,
})
export class TelefonePipe implements PipeTransform {
  public transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    const digitos = value.replace(/\D/g, '');

    switch (digitos.length) {
      case 11:
        return digitos.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      case 10:
        return digitos.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      case 9:
        return digitos.replace(/^(\d{5})(\d{4})$/, '$1-$2');
      case 8:
        return digitos.replace(/^(\d{4})(\d{4})$/, '$1-$2');
      default:
        return value;
    }
  }
}
