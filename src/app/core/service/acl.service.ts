import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AclService {
  constructor(private authenticationService: AuthenticationService) {
  }

  hasAccess(resource: string): boolean {
    const user = this.authenticationService.currentUserValue;
    return (!!user.permissions.find((perm) => perm === resource) || user.super_admin);
  }
}
