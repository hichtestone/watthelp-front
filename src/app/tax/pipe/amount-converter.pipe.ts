import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'amountConverter'})
export class AmountConverterPipe implements PipeTransform {
  transform(amount: any, coefficient: number = 10 ** 7): string {
    if (!amount) {
      return;
    }
    return typeof amount === 'number' ? (amount / coefficient).toString() : (parseInt(amount, 10) / coefficient).toString();
  }
}
