import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {InvoiceService} from '../../../../invoice/service/invoice.service';
import {SnackbarService} from '../../../../core/service/snackbar.service';
import * as moment from 'moment';
import {DeliveryPointInterface} from '../../../model/delivery-point.interface';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {AppUtils} from '../../../../core/utils/constant';

@Component({
  selector: 'app-budget-delivery-point-stat',
  templateUrl: './budget-delivery-point-stat.component.html',
  styleUrls: ['./budget-delivery-point-stat.component.scss']
})
export class BudgetDeliveryPointStatComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit {
  flipped = false;
  isLoading = false;
  format = 'YYYY-MM-DD';
  @Input() deliveryPoint: DeliveryPointInterface;
  @Input() budgetExist = false;
  Highcharts: typeof Highcharts = Highcharts;
  data: any;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Reporting Cons vs Budget ' + moment().year()
    },
    yAxis: {
      title: {
        text: 'Cons & budget (kWh)'
      }
    },

    xAxis: {
      categories: AppUtils.MONTHS,
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    },
    credits: {
      enabled: false
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 1000
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  chartTypeChanged = true;

  constructor(private invoiceService: InvoiceService,
              private snackBarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getStats();
  }

  ngAfterViewInit(): void {
    this.getStats();
  }

  getStats(): void {
    if (this.budgetExist) {
      this.invoiceService.getBudgetComparisonStats(this.prepareFiltersToSend()).subscribe(data => {
          const values: any = [
            {
              name: 'Cons (kWh)',
              data: data.consumed.map(item => !!item ? item / 10 ** 2 : item),
            },
            {
              name: 'Budget (kWh)',
              data: data.budgeted.map(item => !!item ? item / 10 ** 2 : item),
            }
          ];
          this.isLoading = true;
          this.displayChart(values);
          this.data = data;
          this.isLoading = false;

        }, error => {
          this.snackBarService.addMessage(this.handleWidgetError(error));
          this.isLoading = false;
        }
      );
    }

    this.isLoading = false;
  }

  onChartTypeChange(): void {
    this.chartTypeChanged = !this.chartTypeChanged;
    this.getStats();
  }

  displayChart(values): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: values,
      chart: {
        type: this.chartTypeChanged ? 'spline' : 'column'
      }
    };
  }

  prepareFiltersToSend(): any {
    const start = moment().startOf('year').format(this.format);
    const end = moment().endOf('year').format(this.format);

    const period = {
      start,
      end
    };
    return !!this.deliveryPoint ? {
        delivery_point_filters: {
          ids: [this.deliveryPoint.id]
        },
        period
      }
      : {
        period
      };
  }
}
