import {Injectable} from '@angular/core';
import {HttpService} from '../../core/service/http.service';
import {HttpClient} from '@angular/common/http';
import {PermissionInterface} from "../model/permission/permission.interface";

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends HttpService<PermissionInterface> {
  path = '/permission';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}
