import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {CreateComponent} from './component/create/create.component';
import {EditComponent} from './component/edit/edit.component';
import {TaxEditResolver} from './component/edit/edit.resolver';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'tax.breadcrumb.new'
    }
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      tax: TaxEditResolver
    },
    data: {
      breadcrumb: 'tax.breadcrumb.detail'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TaxRoutingModule {
}
