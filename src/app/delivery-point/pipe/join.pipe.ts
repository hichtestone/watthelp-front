import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'join',
  pure: false
})
export class JoinPipe implements PipeTransform {
  transform(items: Array<string>): any {
    if (!items) {
      return '';
    }

    return items.join(' ');
  }
}
