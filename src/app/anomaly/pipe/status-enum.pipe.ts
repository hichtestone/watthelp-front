import {Pipe, PipeTransform} from '@angular/core';
import {AvailableStatusEnum} from '../model/available-status.enum';

@Pipe({
  name: 'anomalyStatus'
})
export class StatusEnumPipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case AvailableStatusEnum.STATUS_PROCESSING :
        return 'core.tooltip.processing';
      case AvailableStatusEnum.STATUS_IGNORED:
        return 'core.tooltip.ignored';
      case AvailableStatusEnum.STATUS_UNSOLVED:
        return 'core.tooltip.unsolved';
      case AvailableStatusEnum.STATUS_SOLVED:
        return 'core.tooltip.solved';
      default:
        return '-';
    }
  }
}
