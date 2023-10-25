import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {ImportReportInterface} from '../../model/import-report.interface';
import {ImportReportService} from '../../service/import-report.service';

@Injectable()
export class ImportReportResolver implements Resolve<ImportReportInterface> {
  constructor(private importReportService: ImportReportService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ImportReportInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);
    const expand = [
      'invoice_analysis',
      'invoice_delivery_point_invoices',
      'delivery_point_invoice_delivery_point',
      'analysis_delivery_point_invoice_analyses',
      'analysis_item_analyses',
      'delivery_point_invoice_analysis_item_analyses',
      'delivery_point_invoice_delivery_point_invoice_analysis',
      'import_report_invoices',
      'import_report_delivery_points',
      'import_report_anomalies',
      'import_report_budgets',
      'import_report_pricings',
      'delivery_point_contract',
      'import_report_import',
      'invoice_import_file',
      'invoice_import_user',
    ].join(',');


    return this.importReportService.get(id, expand)
      .pipe(map(invoice => {
        if (invoice) {
          return invoice;
        } else {
          this.router.navigate(['../']);
          return null;
        }
      }));
  }
}
