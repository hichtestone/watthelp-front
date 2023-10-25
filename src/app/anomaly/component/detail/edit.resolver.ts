import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {AnomalyService} from '../../service/anomaly-service';
import {Observable} from 'rxjs';
import {AnomalyInterface} from '../../model/anomaly.interface';

@Injectable()
export class AnomalyEditResolver implements Resolve<AnomalyInterface> {
  constructor(private anomalyService: AnomalyService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnomalyInterface> {
    const id: number = parseInt(route.paramMap.get('id'), 10);
    const expand = [
      'anomaly_item_analysis',
      'item_analysis_analysis',
      'analysis_invoice',
      'invoice_pdf',
      'invoice_import_report',
      'item_analysis_delivery_point_invoice_analysis',
      'delivery_point_invoice_analysis_delivery_point_invoice',
      'delivery_point_invoice_delivery_point',
      'anomaly_notes',
      'note_user',
      'anomaly_import_report',
      'import_report_import',
      'invoice_import_file'
    ].join(',');

    return this.anomalyService.get(id, expand)
      .pipe(map(anomaly => {
        if (anomaly) {
          return anomaly;
        } else {
          this.router.navigate(['../']);
          return null;
        }
      }));
  }
}
