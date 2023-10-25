import {PricingEvolutionComponent} from '../../../pricing/component/widget/pricing-evolution/pricing-evolution.component';
import {ComponentFactoryResolver} from '@angular/core';
import {StatsCountComponent} from '../../../delivery-point/component/widget/stats-count/stats-count.component';
import {AlertStatComponent} from '../../../anomaly/component/widget/alert-stat/alert-stat.component';
import {BudgetStatsComponent} from '../../../budget/component/widget/budget-stats/budget-stats.component';
import {ConsumptionStatsComponent} from '../../../invoice/widget/consumption-stats/consumption-stats.component';
import {MapWidgetComponent} from '../../../map/component/widget/map-widget.component';
import {AclService} from '../../../core/service/acl.service';
import {Permission} from '../../../role/model/permission/permission-constant';
import {ConsumptionVsBudgetStatsComponent} from '../../../invoice/widget/consumption-vs-budget-stats/consumption-vs-budget-stats.component';
import {TaxSubscriptionStatsComponent} from '../../../tax/component/widget/tax-subscription-stats/tax-subscription-stats.component';
import * as Highcharts from 'highcharts';

export class LoadWidgetComponent {
  factories = [];

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected aclService: AclService
  ) {
// gradient chart colors -> will be applied to whole application
    Highcharts.setOptions({
      colors: Highcharts.map(Highcharts.getOptions().colors, (color) => {
        return {
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.4).get('rgb')] // darken
          ]
        };
      })
    });
  }

  loadWidgets(): void {
    // TODO find a better way to replace the below code
    const dashboardAccess = this.aclService.hasAccess(Permission.DASHBOARD_VIEW);
    const pricingAccess = this.aclService.hasAccess(Permission.PRICING_VIEW);
    const anomalyAccess = this.aclService.hasAccess(Permission.ANOMALY_VIEW);
    const budgetAccess = this.aclService.hasAccess(Permission.BUDGET_VIEW);
    const deliveryPointAccess = this.aclService.hasAccess(Permission.DELIVERY_POINT_VIEW);
    const consumptionAccess = this.aclService.hasAccess(Permission.CONSUMPTION_VIEW);
    const mapAccess = this.aclService.hasAccess(Permission.MAP_VIEW);
    const taxAccess = this.aclService.hasAccess(Permission.TAX_VIEW);

    if (dashboardAccess && consumptionAccess && deliveryPointAccess && anomalyAccess) {
      const globalStatsComponent = this.componentFactoryResolver.resolveComponentFactory(StatsCountComponent);
      this.factories.push(globalStatsComponent);
    }

    if (dashboardAccess && pricingAccess) {
      const pricingEvolutionComponent = this.componentFactoryResolver.resolveComponentFactory(PricingEvolutionComponent);
      this.factories.push(pricingEvolutionComponent);
    }

    if (dashboardAccess && anomalyAccess) {
      const alertStatsComponent = this.componentFactoryResolver.resolveComponentFactory(AlertStatComponent);
      this.factories.push(alertStatsComponent);
    }

    if (dashboardAccess && budgetAccess) {
      const budgetStatsComponent = this.componentFactoryResolver.resolveComponentFactory(BudgetStatsComponent);
      this.factories.push(budgetStatsComponent);
    }

    if (dashboardAccess && consumptionAccess) {
      const consumptionStatsComponent = this.componentFactoryResolver.resolveComponentFactory(ConsumptionStatsComponent);
      this.factories.push(consumptionStatsComponent);
    }

    if (dashboardAccess && consumptionAccess && budgetAccess) {
      const consumptionVsBudgetStatsComponent = this.componentFactoryResolver.resolveComponentFactory(ConsumptionVsBudgetStatsComponent);
      this.factories.push(consumptionVsBudgetStatsComponent);
    }

    if (dashboardAccess && mapAccess) {
      const mapWidgetComponent = this.componentFactoryResolver.resolveComponentFactory(MapWidgetComponent);
      this.factories.push(mapWidgetComponent);
    }

    if (dashboardAccess && taxAccess && consumptionAccess) {
      const taxSubscriptionWidgetComponent = this.componentFactoryResolver.resolveComponentFactory(TaxSubscriptionStatsComponent);
      this.factories.push(taxSubscriptionWidgetComponent);
    }
    // Other widgets go here
  }
}
