import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PricingInterface} from '../../model/pricing.interface';
import {PricingService} from '../../service/pricing.service';

@Injectable()
export class PricingEditResolver implements Resolve<PricingInterface> {
  constructor(private pricingService: PricingService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PricingInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.pricingService.get(id).pipe(map(tax => {
      if (tax) {
        return tax;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
