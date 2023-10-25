import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {NoteInterface} from '../model/note.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends HttpService<NoteInterface> {
  path = '/invoice/anomaly';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  postNote(anomalyId: number, data, expandData: string = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.post(this.path + '/' + anomalyId + '/note', data, {headers});
  }
}
