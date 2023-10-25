import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'invoicePeriodLabel'
})
export class InvoicePeriodPipe implements PipeTransform {

  transform(type: string): string {
    return !!type ? 'common.month-' + type : '-';
  }
}
