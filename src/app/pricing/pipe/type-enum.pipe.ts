import {Pipe, PipeTransform} from '@angular/core';
import {ProviderEnum} from '../../contract/model/provider.enum';
import {PricingTypeEnum} from '../model/pricing-type.enum';
import {InvoiceTypeEnum} from '../../invoice/model/invoice/invoice-type.enum';

@Pipe({
  name: 'enumToLabel'
})
export class TypeEnumPipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case PricingTypeEnum.TYPE_NEGOTIATED :
        return 'common.market-offer';
      case PricingTypeEnum.TYPE_REGULATED:
        return 'common.regulated';
      case ProviderEnum.EDF :
        return 'common.edf';
      case ProviderEnum.DIRECT_ENERGIE:
        return 'common.direct-energie';
      case ProviderEnum.ENGIE:
        return 'common.engie';
      case ProviderEnum.OTHER:
        return 'common.other';
      case InvoiceTypeEnum.ESTIMATED:
        return 'common.estimated-consumption';
      case InvoiceTypeEnum.REAL:
        return 'common.real-consumption';
      default:
        return '-';
    }
  }
}
