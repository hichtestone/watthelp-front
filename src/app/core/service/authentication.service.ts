import {Injectable} from '@angular/core';
import {UserInterface} from '../../user/model/user.interface';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ClientInterface} from '../../user/model/client.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserInterface>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem('user')));
  }

  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  /**
   * Clear all authentication values.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('client');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
  }

  refreshToken(): any {
    return this.httpClient.post('/token/refresh', {refresh_token: localStorage.getItem('refresh_token')});
  }

  /**
   * Each authentication should return the same authentication.
   */
  handleStorage(data: UserInterface, client: ClientInterface, token: string, refreshToken: string): any {
    if (!!data) {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('client', JSON.stringify(client));
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);

      this.currentUserSubject.next(data);
    }
    return data;
  }

  updateUser(user: UserInterface): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  refreshStorage(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }
}
