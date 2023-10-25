import { HttpClient } from '@angular/common/http';
import { TRANSLOCO_LOADER, TranslocoLoader } from '@ngneat/transloco';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements TranslocoLoader {

  constructor(private http: HttpClient) {
  }

  getTranslation(langPath: string): Observable<any> {
    return this.http.get(`/assets/i18n/${langPath}.json`);
  }
}

export const httpLoader = { provide: TRANSLOCO_LOADER, useClass: TranslationService };
