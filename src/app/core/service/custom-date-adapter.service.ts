import {Injectable} from '@angular/core';
import {DateService} from './date.service';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

@Injectable()
export class CustomDateAdapterService extends MomentDateAdapter {
  constructor(private dateService: DateService) {
    super('fr-FR'); // set default locale
  }

  public format(date: moment.Moment, displayFormat: string): string {
    const locale = this.dateService.getLocale();
    const format = this.dateService.getFormat();

    return date.locale(locale).format(format);
  }
}
