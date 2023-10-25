import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserInterface} from '../../user/model/user.interface';
import {AuthenticationService} from '../../core/service/authentication.service';
import {Observable} from 'rxjs';
import {ClientInterface} from '../../user/model/client.interface';

@Injectable()
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  login(values: any, expandData: string = null): Observable<any> {
    let headers = new HttpHeaders();

    if (expandData) {
      headers = headers.set('X-Expand-Data', expandData);
    }

    return this.httpClient.post('/login', values, {headers})
      .pipe(map((data: { user: UserInterface, client: ClientInterface, token: string, refresh_token: string }) => {
        return this.authenticationService.handleStorage(data.user, data.client, data.token, data.refresh_token);
      }));
  }

  forgotPassword(values): Observable<any> {
    return this.httpClient.post('/login/forgot', values);
  }

  resetPassword(values): Observable<any> {
    return this.httpClient.post('/login/reset', values);
  }
}
