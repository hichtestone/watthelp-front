import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {
  public getFormat(): string {
    return 'DD MMMM';
  }

  public getLocale(): string {
    return 'fr-FR';
  }
}
