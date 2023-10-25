import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {InvoiceEditResolver} from './component/list/detail/detail.resolver';
import {DetailComponent} from './component/list/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    resolve: {
      invoice: InvoiceEditResolver
    },
    component: DetailComponent,
    data: {
      breadcrumb: 'invoice.breadcrumb.detail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {
}
