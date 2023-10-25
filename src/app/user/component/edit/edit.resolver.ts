import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../../service/user.service';
import {UserInterface} from '../../model/user.interface';

@Injectable()
export class UserEditResolver implements Resolve<UserInterface> {
  constructor(private userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.userService.get(id, 'user_avatar,user_permissions,user_roles,role_permissions').pipe(map(user => {
      if (user) {
        return user;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
