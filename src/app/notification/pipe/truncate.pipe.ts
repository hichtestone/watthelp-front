import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit = 100, completeWords = false, showAll = false, elipsis = '...'): string {

    if (showAll) {
      return text;
    }

    if (text.length < limit) {
      return `${text.substr(0, limit)}`;
    }

    if (completeWords) {
      limit = text.substr(0, limit).lastIndexOf(' ');
    }

    return `${text.substr(0, limit)}${elipsis}`;

  }

}
