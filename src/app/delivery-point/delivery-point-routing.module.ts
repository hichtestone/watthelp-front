import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {CreateComponent} from './component/create/create.component';
import {DeliveryPointEditResolver} from './component/edit/edit.resolver';
import {EditComponent} from './component/edit/edit.component';
import {InvoiceInfoComponent} from './component/detail/associated-invoices/invoice-info/invoice-info.component';
import {DeliveryPointInvoiceDetailResolver} from './component/detail/associated-invoices/resolver/detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'deliverypoint.breadcrumb.dp-creation'
    }
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      deliveryPoint: DeliveryPointEditResolver
    },
    data: {
      breadcrumb: 'deliverypoint.breadcrumb.dp-edition'
    }
  },
  {
    path: ':id/invoice-info/:invoice-id',
    component: InvoiceInfoComponent,
    resolve: {
      deliveryPointInvoice: DeliveryPointInvoiceDetailResolver
    },
    data: {
      breadcrumb: 'deliverypoint.breadcrumb.invoice-details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryPointRoutingModule {
}
