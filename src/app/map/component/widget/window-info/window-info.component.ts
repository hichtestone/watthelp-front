import {Component, Input, OnInit} from '@angular/core';
import {MarkerInterface} from '../../../model/marker.interface';
import {DeliveryPointInterface} from '../../../../delivery-point/model/delivery-point.interface';
import {DeliveryPointService} from '../../../../delivery-point/service/delivery-point.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-window-info',
  templateUrl: './window-info.component.html',
  styleUrls: ['./window-info.component.scss']
})
export class WindowInfoComponent implements OnInit {
  @Input()
  marker: MarkerInterface;

  @Input()
  filterValues: any;

  dp: DeliveryPointInterface;

  constructor(
    private deliveryPointService: DeliveryPointService) {
  }

  ngOnInit(): void {
    this.deliveryPointService
      .get(this.marker.id, 'delivery_point_photo')
      .pipe(take(1))
      .subscribe((dp: DeliveryPointInterface) => {
        this.dp = dp;
      });
  }
}
