import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'taxUnitPipe'})
export class TaxUnitPipe implements PipeTransform {
  transform(type: string): string {
    switch (type) {
      case 'cspe':
        return 'cts €/kWh';
      case 'tdcfe':
        return 'cts €/kWh';
      case 'tccfe':
        return 'cts €/kWh';
      case 'tcfe':
        return 'cts €/kWh';
      case 'cta':
        return '%';
    }
  }
}
