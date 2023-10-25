import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout/component/layout/layout.component';
import {AuthGuard} from './core/guard/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          breadcrumb: 'user.breadcrumb.label'
        }
      },
      {
        path: 'delivery-point',
        loadChildren: () => import('./delivery-point/delivery-point.module').then(m => m.DeliveryPointModule),
        data: {
          breadcrumb: 'deliverypoint.breadcrumb.title'
        }
      },
      {
        path: 'tax',
        loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule),
        data: {
          breadcrumb: 'tax.breadcrumb.title'
        }
      },
      {
        path: 'pricing',
        loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule),
        data: {
          breadcrumb: 'pricing.breadcrumb.label'
        }
      },
      {
        path: 'contract',
        loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule),
        data: {
          breadcrumb: 'contract.breadcrumb.title'
        }
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule),
        data: {
          breadcrumb: 'invoice.breadcrumb.title'
        }
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
        data: {
          breadcrumb: 'notification.breadcrumb.label'
        }
      },
      {
        path: 'analysis-report',
        loadChildren: () => import('./analysis-report/report.module').then(m => m.ReportModule),
        data: {
          breadcrumb: 'report.breadcrumb.label'
        }
      },
      {
        path: 'import-report',
        loadChildren: () => import('./import-report/import-report.module').then(m => m.ImportReportModule),
        data: {
          breadcrumb: 'import.breadcrumb.label'
        }
      },
      {
        path: 'anomaly',
        loadChildren: () => import('./anomaly/anomaly.module').then(m => m.AnomalyModule),
        data: {
          breadcrumb: 'anomaly.breadcrumb.title'
        }
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapModule),
        data: {
          breadcrumb: 'map.breadcrumb'
        }
      },
      {
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule),
        data: {
          breadcrumb: 'Budgets'
        }
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.RoleModule),
        data: {
          breadcrumb: 'role.breadcrumb.label'
        }
      },
      {
        path: 'asset',
        loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule),
        data: {
          breadcrumb: 'asset.breadcrumb.title'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
