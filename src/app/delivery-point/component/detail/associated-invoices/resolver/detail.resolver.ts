import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DeliveryPointInvoiceInterface} from '../../../../../invoice/model/delivery-point-invoice/delivery-point-invoice-interface';
import {map} from 'rxjs/operators';
import {DeliveryPointInvoiceService} from '../../../../../invoice/service/delivery-point-invoice.service';

@Injectable()
export class DeliveryPointInvoiceDetailResolver implements Resolve<DeliveryPointInvoiceInterface> {

  expandData = [
    'delivery_point_invoice_delivery_point',
    'delivery_point_contract',
    'contract_pricings',
    'delivery_point_invoice_invoice',
    'delivery_point_invoice_invoice_consumption',
    'delivery_point_invoice_invoice_subscription',
    'delivery_point_invoice_invoice_taxes',
    'delivery_point_invoice_delivery_point_invoice_analysis',
    'delivery_point_invoice_analysis_item_analyses'
  ].join(',');

  constructor(private deliveryPointInvoiceService: DeliveryPointInvoiceService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeliveryPointInvoiceInterface> {
    const id: number = parseInt(route.paramMap.get('invoice-id'), 10);

    return this.deliveryPointInvoiceService.get(id, this.expandData).pipe(map(deliveryPointInvoiceInterface => {
      if (deliveryPointInvoiceInterface) {
        return deliveryPointInvoiceInterface;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
