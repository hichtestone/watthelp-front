import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../dashboard/component/widget/abstract-widget.component';
import {WidgetConfigInterface} from '../../../dashboard/model/widget.config.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import {takeUntil} from 'rxjs/operators';
import {EditableInterface} from '../../../dashboard/model/editable.interface';
import {InvoiceService} from '../../service/invoice.service';
import * as moment from 'moment';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {AppUtils} from '../../../core/utils/constant';

@Component({
  selector: 'app-consumption-stats',
  templateUrl: 'consumption-stats.component.html',
  styleUrls: ['consumption-stats.component.scss']
})
export class ConsumptionStatsComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.consumption',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/real-consumption.png',
    options: {cols: 7, rows: 4, minItemRows: 4, minItemCols: 7},
  };

  chart: Chart;
  moduleName = 'consumption';
  flipped = false;
  dpFilters: any;

  // Default values set for settings
  settings: any = {
    label: 'Consommations',
    years: [moment().year()],
    period_from: '',
    period_at: '',
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

    this.invoiceService.getConsumptionStats(this.prepareFiltersToSend()).subscribe(data => {
        const series = [];
        const sumConsumptionValues = [];

        for (const [year, consumption] of Object.entries(data)) {
          series.push({
            name: year,
            data: consumption,
          });
        }

        series.forEach(value => {
          sumConsumptionValues.push({
            name: value.name,
            data: [value.data.map(d => !!d ? d : 0).reduce((a: number, b: number) => a + b)]
          });
        });

        this.displayChart(!!this.config.switch_by_year_month ? series : sumConsumptionValues);
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
          text: 'Conso (kWh)'
        }
      },

      xAxis: {
        categories: !!this.settings.switch_by_year_month ? AppUtils.MONTHS : ['Consommation(s) par année'],
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
    this.dpFilters = JSON.parse(localStorage.getItem('dpFilterConsumptionBudget'));

    // If the years filed has not been set, then send the current year instead.
    const years = !!this.config.years
      ? this.config.years.map(item => parseInt(item, 10))
      : [moment().year()];

    const period_from = this.config.period_from;
    const period_at = this.config.period_at;

    const start_day = period_from ? moment(period_from).format('DD') : null;
    const start_month = period_from ? moment(period_from).format('MM') : null;

    const end_day = period_at ? moment(period_at).format('DD') : null;
    const end_month = period_at ? moment(period_at).format('MM') : null;

    const period = {
      start_day,
      start_month,
      end_day,
      end_month
    };

    return !!this.dpFilters ? {
        delivery_point_filters: this.dpFilters,
        years: [years],
        period
      }
      : {
        years: [years],
        period
      };
  }

  onDpFilterChange(dpFilters: any): void {
    localStorage.removeItem('dpFilterConsumptionBudget');
    this.dpFilters = dpFilters.delivery_point_filters;
    localStorage.setItem('dpFilterConsumptionBudget', JSON.stringify(this.dpFilters));
  }
}
