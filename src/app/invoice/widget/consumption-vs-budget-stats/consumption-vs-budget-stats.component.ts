import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../dashboard/component/widget/abstract-widget.component';
import {EditableInterface} from '../../../dashboard/model/editable.interface';
import {WidgetConfigInterface} from '../../../dashboard/model/widget.config.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import * as moment from 'moment';
import {InvoiceService} from '../../service/invoice.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {takeUntil} from 'rxjs/operators';
import {AppUtils} from '../../../core/utils/constant';

@Component({
  selector: 'app-consumption-vs-budget-stats',
  templateUrl: './consumption-vs-budget-stats.component.html',
  styleUrls: ['./consumption-vs-budget-stats.component.scss']
})
export class ConsumptionVsBudgetStatsComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.consumption-vs-budget',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/consumption-budget.png',
    options: {cols: 7, rows: 4, minItemRows: 4, minItemCols: 7},
  };

  chart: Chart;
  flipped = false;
  moduleName = 'budget-comparison';
  format = 'YYYY-MM-DD';
  dpFilters: any;

  // Default values set for settings
  settings: any = {
    label: 'Consommation vs Budget',
    started_at: moment().format(this.format),
    finished_at: moment().add(1, 'M').format(this.format),
    dp_length: 0,
    switch_chart: true,
    switch_by_year_month: true
  };

  constructor(private invoiceService: InvoiceService,
              private snackBarService: SnackbarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.configChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => this.filter());
  }

  ngAfterViewInit(): void {
    this.filter();
  }

  filter(): void {
    this.isLoading = true;

    this.invoiceService.getBudgetComparisonStats(this.prepareFiltersToSend()).subscribe(data => {
        const values: any = [
          {
            name: 'Consommation (en kWh)',
            data: data.consumed.map(item => !!item ? item / 10 ** 2 : item),
          },
          {
            name: 'Budget (en kWh)',
            data: data.budgeted.map(item => !!item ? item / 10 ** 2 : item),
          },
        ];

        this.displayChart(values);
        this.isLoading = false;
      }, error => {
        this.snackBarService.addMessage(this.handleWidgetError(error));
        this.isLoading = false;
      }
    );

    this.isLoading = false;
  }

  resize($event): void {
    if (!!this.chart) {
      this.chart.reflow();
    }
  }

  displayChart(values): void {
    this.chart = Highcharts.chart(this.id, {
      chart: {
        type: this.settings.switch_chart ? 'spline' : 'column'
      },
      title: {
        text: ''
      },
      yAxis: {
        title: {
          text: 'Conso et budget (en kWh)'
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
      series: values,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
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
    });
  }

  filterChange(formValue): void {
    this.settings = formValue;
  }

  edit(edit: boolean): void {
    this.flipped = edit;
    if (!edit) {
      this.configChange.emit(this.settings);
    }
  }

  prepareFiltersToSend(): any {

    const started_at = this.config.started_at;
    const finished_at = this.config.finished_at;

    const start = started_at ? moment(started_at).format(this.format) : moment().format(this.format);
    const end = finished_at ? moment(finished_at).format(this.format) : moment().add(1, 'M').format(this.format);

    this.dpFilters = JSON.parse(localStorage.getItem('dpFilterConsumptionBudget'));

    const period = {
      start,
      end
    };
    return !!this.dpFilters ? {
        delivery_point_filters: this.dpFilters,
        period
      }
      : {
        period
      };
  }

  onDpFilterChange(dpFilters: any): void {
    localStorage.removeItem('dpFilterConsumptionBudget');
    this.dpFilters = dpFilters.delivery_point_filters;
    localStorage.setItem('dpFilterConsumptionBudget', JSON.stringify(this.dpFilters));
  }
}
