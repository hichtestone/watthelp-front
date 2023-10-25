import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {InvoiceInterface} from '../../../model/invoice/invoice.interface';
import {InvoiceService} from '../../../service/invoice.service';
import {Observable} from 'rxjs';

@Injectable()
export class InvoiceEditResolver implements Resolve<InvoiceInterface> {
  constructor(private invoiceService: InvoiceService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    const expand = [
      'invoice_analysis',
      'analysis_item_analyses',
      'item_analysis_anomaly',
      'delivery_point_invoice_analysis_item_analyses',
      'delivery_point_invoice_delivery_point',
      'analysis_delivery_point_invoice_analyses',
      'invoice_pdf',
      'invoice_delivery_point_invoices',
      'delivery_point_invoice_invoice_subscription',
      'delivery_point_invoice_delivery_point_invoice_analysis',
      'invoice_import_report',
      'import_report_import',
      'invoice_import_file',
      'invoice_amount_by_type'
    ].join(',');

    return this.invoiceService.get(id, expand).pipe(map(invoice => {
      if (invoice) {
        return invoice;
      } else {
        this.router.navigate(['../']);
        return null;
      }
    }));
  }
}
