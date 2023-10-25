import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../core/service/http.service';
import {DeliveryPointInvoiceInterface} from '../model/delivery-point-invoice/delivery-point-invoice-interface';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPointInvoiceService extends HttpService<DeliveryPointInvoiceInterface> {
  path = '/delivery-point-invoice';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  exportAssetsToExcel(selection: SelectionModel<DeliveryPointInvoiceInterface | string>, filters): Observable<any> {
    const data = {
      filters: selection.isSelected('*') ? filters : {ids: selection.selected.map((item: DeliveryPointInvoiceInterface) => item.id)}
    };
    return this.httpClient.post(this.path + '/export', data);
  }
}
