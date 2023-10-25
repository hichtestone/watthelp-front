import {Pipe, PipeTransform} from '@angular/core';
import {LabelTypeEnum} from '../model/label-type.enum';

@Pipe({
  name: 'labelFormat'
})
export class LabelEnumPipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case LabelTypeEnum.AMOUNT :
        return 'common.amount';
      case LabelTypeEnum.CONSUMPTION:
        return 'common.consumption';
      case LabelTypeEnum.SUBSCRIPTION :
        return 'common.subscription';
      case LabelTypeEnum.DATE:
        return 'common.date';
      case LabelTypeEnum.INDEX:
        return 'common.index';
      case LabelTypeEnum.TURPE:
        return 'common.turpe';
      case LabelTypeEnum.UNIT_PRICE:
        return 'common.unit-price';
      case LabelTypeEnum.DELIVERY_POINT_CHANGE:
        return 'common.update-dp';
      case LabelTypeEnum.NONE:
        return 'common.none';
      case LabelTypeEnum.CLIENT:
        return 'common.profit.gain';
      case LabelTypeEnum.PROVIDER:
        return 'common.profit.loss';
      default:
        return '-';
    }
  }
}
