import {Component, OnInit} from '@angular/core';
import {MarkerInterface} from '../../model/marker.interface';
import {MapService} from '../../service/map.service';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data: MarkerInterface[];

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.filter({});
  }

  filter(values): void {
    this.mapService.getMarkers()
      .subscribe((data: MarkerInterface[]) => {
        this.data = data;
      });
  }
}
