import {Pipe, PipeTransform} from '@angular/core';
import {NotificationTypeEnum} from '../../notification/model/notification-type.enum';

@Pipe({name: 'importType'})
export class ImportReportTypePipe implements PipeTransform {
  transform(type: string): string {
    switch (type) {
      case NotificationTypeEnum.INVOICE:
        return 'common.invoice';
      case NotificationTypeEnum.SCOPE:
        return 'common.scope';
      case NotificationTypeEnum.ANALYSIS:
        return 'common.analysis';
      case NotificationTypeEnum.BUDGET:
        return 'common.budget';
      case NotificationTypeEnum.PRICING:
        return 'common.pricing';
      default:
        return '-';
    }
  }
}
