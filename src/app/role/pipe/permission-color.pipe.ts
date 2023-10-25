import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'activationColor'
})
export class PermissionColorPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? '#00c853' : '#dd5322';
  }
}
