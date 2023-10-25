import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'languagePipe'
})
export class LanguagePipePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'it':
        return 'Italiano';
      default:
        break;
    }
  }
}
