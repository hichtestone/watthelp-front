import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {NotificationInterface} from '../model/notification.interface';
import {HttpService} from '../../core/service/http.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService<NotificationInterface> {
  notificationDeleted = new Subject<number[]>();
  path = '/notification';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  receivedNotifications(data, expandData: string = null): Observable<any> {
    let headers = new HttpHeaders();
    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }

    return this.httpClient.get(this.path, {
      params: data,
      headers,
      observe: 'response'
    });
  }

  patch(notificationId: number | string, operations: Array<any>): Observable<any> {
    return this.httpClient.patch('/notification/' + notificationId, {operations}).pipe(map(
      () => {
        return true;
      }
    ));
  }

  removeNotification(ids: (number | string)[]): Observable<any> {
    return this.httpClient.post(this.path + '/delete', {ids});
  }
}
