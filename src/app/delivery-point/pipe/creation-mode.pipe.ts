import {Pipe, PipeTransform} from '@angular/core';
import {CreationModeEnum} from '../model/creation-mode.enum';

@Pipe({
  name: 'modeLabel',
  pure: false
})
export class CreationModePipe implements PipeTransform {
  transform(mode: string): string {
    switch (mode) {
      case CreationModeEnum.SCOPE_IMPORT :
        return 'deliverypoint.list.import-scope';
      case CreationModeEnum.INVOICE_IMPORT :
        return 'deliverypoint.list.import-invoice';
      case CreationModeEnum.MANUAL :
        return 'deliverypoint.list.manual';
      default:
        return '-';
    }
  }
}
