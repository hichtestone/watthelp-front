import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {WidgetConfigInterface} from '../../../../dashboard/model/widget.config.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import {takeUntil} from 'rxjs/operators';
import {EditableInterface} from '../../../../dashboard/model/editable.interface';
import {BudgetService} from '../../../service/budget.service';
import {SnackbarService} from '../../../../core/service/snackbar.service';
import * as moment from 'moment';
import {StorageService} from '../../../../core/service/storage.service';

@Component({
  selector: 'app-budget-stats',
  templateUrl: 'budget-stats.component.html',
  styleUrls: ['budget-stats.component.scss']
})
export class BudgetStatsComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.budget',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/global-budget.png',
    options: {cols: 7, rows: 4, minItemRows: 4, minItemCols: 7},
  };

  chart: Chart;
  moduleName = 'budget';
  flipped = false;
  settings: any = {
    label: 'Budgets',
    year: moment().year(),
    consumed_chart_color: '',
    expected_chart_color: '',
    forecast_chart_color: '',
  };

  constructor(private budgetService: BudgetService,
              private snackBarService: SnackbarService,
              private storageService: StorageService) {
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
    const year = this.config.year;

    this.budgetService.getBudgetStats(year).subscribe(data => {
        const consumedChartColor = this.storageService.getItem('consumed_chart_color');
        const expectedChartColor = this.storageService.getItem('expected_chart_color');
        const forecastChartColor = this.storageService.getItem('forecast_chart_color');

        const values: any = [
          {
            name: 'Budget réel',
            data: data.consumed.map(item => !!item ? item / 10 ** 7 : item),
            color: consumedChartColor ? consumedChartColor : this.config.consumed_chart_color
          },
          {
            name: 'Budget théorique',
            data: data.expected.map(item => item / 10 ** 7),
            color: expectedChartColor ? expectedChartColor : this.config.expected_chart_color
          },
        ];

        const healthyForecastBudget = data.forecast.some(item => !!item);

        if (healthyForecastBudget) {
          values.push({
            name: 'Bugdet prévisionnel',
            data: data.forecast.map(item => !!item ? item / 10 ** 7 : item),
            dashStyle: 'shortdash',
            color: forecastChartColor ? forecastChartColor : this.config.forecast_chart_color
          });
        }
        this.isLoading = true;
        this.displayChart(values);
        this.isLoading = false;
      },
      error => {
        this.snackBarService.addMessage(this.handleWidgetFormError(error));
        this.isLoading = false;
      }
    );
  }

  resize($event): void {
    if (!!this.chart) {
      this.chart.reflow();
    }
  }

  displayChart(values): void {
    this.chart = Highcharts.chart(this.id, {
      chart: {
        type: 'spline'
      },
      title: {
        text: `Budget de l'année ${this.config.year}`,
      },
      yAxis: {
        title: {
          text: 'Montant (en €)'
        }
      },

      xAxis: {
        categories: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
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
}
