import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'taxLabel'})
export class TaxLabelPipe implements PipeTransform {
  transform(type: string): string {
    switch (type) {
      case 'cspe':
        return 'deliverypoint.template.taxes.type.cspe';
      case 'tdcfe':
        return 'deliverypoint.template.taxes.type.tdcfe';
      case 'tccfe':
        return 'deliverypoint.template.taxes.type.tccfe';
      case 'tcfe':
        return 'deliverypoint.template.taxes.type.tcfe';
      case 'cta':
        return 'deliverypoint.template.taxes.type.cta';
      default:
        return '-';
    }
  }
}
