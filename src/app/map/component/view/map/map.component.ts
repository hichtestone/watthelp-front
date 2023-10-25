import {Component, Input} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {DeliveryPointInterface} from '../../../../delivery-point/model/delivery-point.interface';
import {MarkerInterface} from '../../../model/marker.interface';

declare var google: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  fitBounds = true;
  usePanning = false;

  latitude = 46.52863469527167;
  longitude = 2.43896484375;

  redMarkers = [];
  isRedMarkersVisible = true;

  greenMarkers = [];
  isGreenMarkersVisible = true;

  numberOfNoLatLon = 0;

  constructor(private mapsAPILoader: MapsAPILoader) {
  }

  _data: MarkerInterface[];

  @Input()
  set data(data: MarkerInterface[]) {
    if (!!data) {
      this.usePanning = false;
      this._data = data;
      this.updateMarkers();

      // Fit map around markers.
      this.mapsAPILoader.load().then(() => {
        const latlngbounds = new google.maps.LatLngBounds();
        for (const marker of this._data) {
          if (marker.latitude == null || marker.longitude == null) {
            ++this.numberOfNoLatLon;
            continue;
          }
          latlngbounds.extend(new google.maps.LatLng(marker.latitude, marker.longitude));
        }
        this.fitBounds = latlngbounds;
      });
    }
  }

  centerMap(latitude, longitude): void {
    this.usePanning = true;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toggleDisplayRedMarkers(): void {
    this.isRedMarkersVisible = !this.isRedMarkersVisible;
    this.redMarkers.forEach((marker: DeliveryPointInterface) => {
      marker.isVisible = this.isRedMarkersVisible;
    });
  }

  toggleDisplayGreenMarkers(): void {
    this.isGreenMarkersVisible = !this.isGreenMarkersVisible;
    this.greenMarkers.forEach((marker: DeliveryPointInterface) => {
      marker.isVisible = this.isGreenMarkersVisible;
    });
  }

  updateMarkers(): void {
    this.redMarkers = [];
    this.greenMarkers = [];

    this._data.forEach(marker => {
      if (!marker.is_in_scope) {
        marker.marker_color = '/assets/map/map-marker-red.png';
        marker.is_visible = this.isRedMarkersVisible;
        this.redMarkers.push(marker);
      } else {
        if (marker.is_in_scope) {
          marker.marker_color = '/assets/map/map-marker-green.png';
          marker.is_visible = this.isGreenMarkersVisible;
          this.greenMarkers.push(marker);
        }
      }
    });
  }
}
