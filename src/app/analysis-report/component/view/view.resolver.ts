import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ReportAnalysisService} from '../../service/report-analysis.service';
import {ReportAnalysisInterface} from '../../model/report-analysis.interface';

@Injectable()
export class ViewResolver implements Resolve<ReportAnalysisInterface> {
  constructor(private reportService: ReportAnalysisService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReportAnalysisInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);

    const expandData = [
      'analysis_invoice',
      'invoice_delivery_point_invoices',
      'delivery_point_invoice_delivery_point',
      'analysis_delivery_point_invoice_analyses',
      'analysis_item_analyses',
      'delivery_point_invoice_analysis_item_analyses',
      'item_analysis_anomaly',
      'delivery_point_invoice_delivery_point_invoice_analysis',
      'delivery_point_invoice_invoice_consumption',
      'delivery_point_invoice_invoice_subscription',
      'delivery_point_invoice_invoice_taxes']
      .join(',');

    return this.reportService.get(id, expandData).pipe(
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
