import {Component, Input, OnInit} from '@angular/core';
import {DeliveryPointInterface} from '../../../delivery-point/model/delivery-point.interface';
import {DeliveryPointService} from '../../../delivery-point/service/delivery-point.service';
import {MarkerInterface} from '../../model/marker.interface';


@Component({
  selector: 'app-info-windows',
  templateUrl: './info-windows.component.html',
  styleUrls: ['./info-windows.component.scss']
})
export class InfoWindowsComponent implements OnInit {

  @Input()
  marker: MarkerInterface;

  dp: DeliveryPointInterface;

  constructor(
    private deliveryPointService: DeliveryPointService) {
  }

  ngOnInit(): void {
    this.deliveryPointService
      .get(this.marker.id, 'delivery_point_photo')
      .subscribe((dp: DeliveryPointInterface) => {
        this.dp = dp;
      });
  }
}
