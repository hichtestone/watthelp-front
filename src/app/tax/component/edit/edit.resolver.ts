import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {TaxInterface} from '../../model/tax-interface';
import {TaxService} from '../../service/tax.service';
import {Observable} from 'rxjs';

@Injectable()
export class TaxEditResolver implements Resolve<TaxInterface> {
  constructor(private taxService: TaxService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaxInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.taxService.get(id).pipe(map(tax => {
      if (tax) {
        return tax;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
