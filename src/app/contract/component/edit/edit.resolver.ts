import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ContractInterface} from '../../model/contract.interface';
import {ContractService} from '../../service/contract.service';

@Injectable()
export class ContractEditResolver implements Resolve<ContractInterface> {
  constructor(private contractService: ContractService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContractInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    return this.contractService.get(id, 'contract_pricings').pipe(map(contract => {
      if (contract) {
        return contract;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
