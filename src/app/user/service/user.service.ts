import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserInterface} from '../model/user.interface';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService<UserInterface> {
  path = '/user';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public uploadAvatar(id: number, operations, expandData = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }

    return this.httpClient.patch(this.path + '/' + id, operations, {headers});
  }

  patchUser(operations: Array<any>, expandData = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }
    return this.httpClient.patch(this.path + '/me', operations, {headers});
  }
}
