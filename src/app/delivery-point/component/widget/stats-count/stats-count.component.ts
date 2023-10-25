import {Component, OnInit} from '@angular/core';
import {AbstractWidgetComponent} from '../../../../dashboard/component/widget/abstract-widget.component';
import {WidgetConfigInterface} from '../../../../dashboard/model/widget.config.interface';
import {DeliveryPointService} from '../../../service/delivery-point.service';
import {GlobalStatInterface} from '../../../model/global-stat.interface';

@Component({
  selector: 'app-stats-count',
  templateUrl: 'stats-count.component.html',
  styleUrls: ['stats-count.component.scss']
})
export class StatsCountComponent extends AbstractWidgetComponent implements OnInit {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.global-stats',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/global-stats.png',
    options: {cols: 13, rows: 2, minItemCols: 13}
  };

  data: GlobalStatInterface;
  dataScope: any;

  constructor(private deliveryPointService: DeliveryPointService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.deliveryPointService.getGlobalStats().subscribe((data: GlobalStatInterface) => {
      this.data = data;
      this.dataScope = data.delivery_points[0];
    });

    this.isLoading = false;
  }
}
