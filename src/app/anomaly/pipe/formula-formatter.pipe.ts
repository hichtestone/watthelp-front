import {Pipe, PipeTransform} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'formulaFormatter'
})
export class FormulaFormatterPipe implements PipeTransform {

  transform(value: string): SafeHtml {
    if (!!value) {
      const doubleLineBreaker = '.<br><br>';
      const dataSplit = value.split('.');

      return dataSplit.join(doubleLineBreaker);
    }

    return '';
  }
}
