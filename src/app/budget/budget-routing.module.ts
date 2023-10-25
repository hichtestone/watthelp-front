import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './component/list/list.component';
import {DetailComponent} from './component/detail/detail.component';
import {BudgetEditResolver} from './component/detail/edit.resolver';
import {DeliveryPointBudgetEditResolver} from './component/detail/edit-delivery-point-budget/delivery-point-budget-edit.resolver';
import {EditDeliveryPointBudgetComponent} from './component/detail/edit-delivery-point-budget/edit-delivery-point-budget.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailComponent,
    resolve: {
      budget: BudgetEditResolver
    },
    data: {
      breadcrumb: 'Détail d\'un budget'
    }
  },
  {
    path: ':id',
    data: {
      breadcrumb: 'Edition d\'un budget'
    },
    children: [
      {
        path: '',
        resolve: {
          budget: BudgetEditResolver
        },
        component: DetailComponent,
      },
      {
        path: 'delivery/:deliveryId',
        component: EditDeliveryPointBudgetComponent,
        resolve: {
          deliveryPointBudget: DeliveryPointBudgetEditResolver
        },
        data: {
          breadcrumb: 'Edition budget de point de livraison'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule {
}
