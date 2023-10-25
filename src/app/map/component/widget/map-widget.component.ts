import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';

import {MapService} from '../../service/map.service';
import {AbstractWidgetComponent} from '../../../dashboard/component/widget/abstract-widget.component';
import {EditableInterface} from '../../../dashboard/model/editable.interface';
import {takeUntil} from 'rxjs/operators';
import {WidgetConfigInterface} from '../../../dashboard/model/widget.config.interface';
import {MarkerInterface} from '../../model/marker.interface';

declare var google: any;

@Component({
  selector: 'app-widget-map',
  templateUrl: './map-widget.component.html',
  styleUrls: ['./map-widget.component.scss'],
})
export class MapWidgetComponent extends AbstractWidgetComponent implements OnInit, AfterViewInit, EditableInterface {
  static config: WidgetConfigInterface = {
    title: 'dashboard.modal-group.map',
    group: 'dashboard.modal-group.global',
    preview: '/assets/dashboard/map.png',
    options: {cols: 6, rows: 4, minItemRows: 4, minItemCols: 6}
  };

  flipped = false;
  markerData: MarkerInterface[];

  notFoundMarkers = [];
  foundMarkers = [];

  settings: any = {
    label: 'Cartographie des points de livraison',
    color_found: '#66bb6a',
    color_not_found: '#ef5350',
  };

  latitude = 43.005;
  longitude = 6.923370299999988;
  markerUrl = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|';

  widgetNumberOfNoLatLon = 0;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService
  ) {
    super();
  }

  set data(data: MarkerInterface[]) {
    if (!!data) {
      this.markerData = data;
      this.updateMarkers();
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.filter();
  }

  ngOnInit(): void {
    this.configChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => this.filter());
    this.filter();
  }

  edit(edit: boolean): void {
    this.flipped = edit;
    if (!edit) {
      this.configChange.emit(this.settings);
    }
  }

  filterChange(formValue): void {
    this.settings = formValue;
  }

  filter(): void {
    this.isLoading = true;
    this.mapService.getMarkers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: MarkerInterface[]) => {
        this.data = data;

        this.widgetNumberOfNoLatLon = 0;

        data.forEach(marker => {
          if (marker.latitude === null || marker.longitude === null) {
            ++this.widgetNumberOfNoLatLon;
          }
        });
      });
  }

  updateMarkers(): void {
    this.foundMarkers = [];
    this.notFoundMarkers = [];

    this.markerData.forEach(marker => {
      if (marker.is_in_scope) {
        marker.marker_color = this.markerUrl + this.config.color_found.slice(1, 7);
        this.foundMarkers.push(marker);
      } else {
        marker.marker_color = this.markerUrl + this.config.color_not_found.slice(1, 7);
        this.notFoundMarkers.push(marker);
      }
    });
  }

  centerMap(latitude, longitude): void {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
