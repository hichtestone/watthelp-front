import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {WidgetConfigInterface} from '../../../../dashboard/model/widget.config.interface';
import * as Highcharts from 'highcharts';
import {Chart} from 'highcharts';
import {EditableInterface} from '../../../../dashboard/model/editable.interface';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-pricing-evolution',
  templateUrl: './pricing-evolution.component.html',
  styleUrls: ['./pricing-evolution.component.scss']
})
export class PricingEvolutionComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.price-evolution',
    group: 'dashboard.modal-group.price',
    preview: '/assets/dashboard/pricing-evolution.png',
    options: {cols: 6, rows: 4, minItemRows: 3, minItemCols: 4}
  };

  chart: Chart;
  flipped = false;
  settings: any = {
    label: 'Evolution des tarifs',
  };

  constructor() {
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
    const series = [];
    const chartData = [297.2, 318.2, 336.6, 367.3, 395.2, 395.2, 436.6, 441.3, 447.3, 450.3];

    series.push({
      name: 'Période',
      type: 'column',
      data: chartData
    });

    this.displayChart(series);
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
        type: 'column',
      },
      title: {
        text: '',
        style: {display: 'none'}
      },
      xAxis: {
        categories: [
          'Août 2010',
          'Juillet 2011',
          'Juillet 2012',
          'Août 2013',
          'Novembre 2014',
          'Août 2015',
          'Août 2016',
          'Août 2017',
          'Février 2018',
          'Août 2018'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tarifs'
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} €</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: values
    });
    this.isLoading = false;
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
