import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {EditableInterface} from '../../../../dashboard/model/editable.interface';
import {WidgetConfigInterface} from '../../../../dashboard/model/widget.config.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import * as moment from 'moment';
import {SnackbarService} from '../../../../core/service/snackbar.service';
import {takeUntil} from 'rxjs/operators';
import {TaxService} from '../../../service/tax.service';

@Component({
  selector: 'app-tax-subscription-stats',
  templateUrl: './tax-subscription-stats.component.html',
  styleUrls: ['./tax-subscription-stats.component.scss']
})
export class TaxSubscriptionStatsComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.taxes-subs-consumption',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/amount.png',
    options: {cols: 7, rows: 4, minItemRows: 4, minItemCols: 7},
  };

  chart: Chart;
  flipped = false;
  format = 'YYYY-MM-DD';

  // Default values set for settings
  settings: any = {
    label: 'Taxes + Abonnement + Consommation',
    start: '',
    end: '',
  };

  constructor(private taxService: TaxService,
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

    this.taxService.getAmountStats(this.prepareFiltersToSend()).subscribe(data => {
        const factor = 10 ** 7;

        const colors = [{
          radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, 'rgba(61,140,214,0.81)'],
            [1, Highcharts.color('#3d8cd6').brighten(-0.3).get('rgb')]
          ]
        },
          {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, 'rgba(93,93,93,0.74)'],
              [1, Highcharts.color('#000000').brighten(-0.3).get('rgb')]
            ]
          },
          {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7
            },
            stops: [
              [0, 'rgba(255,104,8,0.8)'],
              [1, Highcharts.color('#ff6808').brighten(-0.3).get('rgb')]
            ]
          }];

        const values: any = [
          {
            name: 'Abonnement',
            y: data.subscription / factor,
            color: colors[0]
          },
          {
            name: 'Consommation',
            y: data.consumption / factor,
            color: colors[1],
          }
        ];

        if (data.taxes.length === 0) {
          values.push(
            {
              name: 'Taxes',
              color: colors[2],
              y: 0
            }
          );
        }

        if (data.taxes.cspe && data.taxes.cta) {
          values.push(
            {
              name: 'CSPE',
              color: colors[2],
              y: data.taxes.cspe / factor
            },
            {
              name: 'CTA',
              color: colors[2],
              y: data.taxes.cta / factor
            },
          );
        }
        if (data.taxes.tdcfe) {
          values.push(
            {
              name: 'TDCFE',
              color: colors[2],
              y: data.taxes.tdcfe / factor
            }
          );
        }

        if (data.taxes.tccfe) {
          values.push(
            {
              name: 'TCCFE',
              color: colors[2],
              y: data.taxes.tccfe / factor
            }
          );
        }

        if (data.taxes.tcfe) {
          values.push(
            {
              name: 'TCFE',
              color: colors[2],
              y: data.taxes.tcfe / factor
            }
          );
        }

        const labels: any = [];

        labels.push('Abonnement');
        labels.push('Consommation');

        if (data.taxes.cspe || data.taxes.cta || data.taxes.tcfe || data.taxes.tccfe || data.taxes.tdcfe) {
          labels.push('Taxes');
        }

        this.displayChart(values, labels);
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

  displayChart(values, labels): void {
    this.chart = Highcharts.chart(this.id, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '',
        style: {display: 'none'}
      },
      accessibility: {
        point: {
          valueSuffix: '€'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.2f} €</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          size: '70%',
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y:.2f} €'
          },
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Montant',
        colorByPoint: true,
        data: values
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 600
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
    } as any);
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
    const started_at = this.config.start;
    const finished_at = this.config.end;

    const start = moment(started_at).format(this.format);
    const end = moment(finished_at).format(this.format);

    if (!!started_at && !!finished_at) {
      return {start, end};

    } else if (!!started_at && !finished_at) {
      return {start};

    } else if (!started_at && !!finished_at) {
      return {end};

    } else {
      return {};
    }
  }
}
