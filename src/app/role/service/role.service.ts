import {Injectable} from '@angular/core';
import {HttpService} from '../../core/service/http.service';
import {HttpClient} from '@angular/common/http';
import {RoleInterface} from '../model/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpService<RoleInterface> {
  path = '/role';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
