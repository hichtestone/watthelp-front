import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {EditComponent} from './component/edit/edit.component';
import {PricingEditResolver} from './component/edit/edit.resolver';
import {CreateComponent} from './component/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'new',
    component: CreateComponent,
    data: {
      breadcrumb: 'pricing.breadcrumb.create'
    }
  },
  {
    path: ':id',
    component: EditComponent,
    resolve: {
      pricing: PricingEditResolver
    },
    data: {
      breadcrumb: 'pricing.breadcrumb.edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule {
}
