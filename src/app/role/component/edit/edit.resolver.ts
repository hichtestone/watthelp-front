import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoleInterface} from '../../model/role.interface';
import {RoleService} from '../../service/role.service';

@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<RoleInterface> {
  constructor(private roleService: RoleService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.roleService.get(id, 'role_permissions').pipe(
      map(object => {
        if (object) {
          return object;
        } else {
          this.router.navigate(['../']);
          return null;
        }
      })
    );
  }
}
