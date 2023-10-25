import {Component, Input} from '@angular/core';
import {CarouselDialogComponent} from './dialog/carousel-dialog.component';
import {ImageInterface} from '../../model/image.interface';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  @Input() images: ImageInterface[];
  @Input() startIndex = 0;

  constructor(private dialog: MatDialog) {
  }

  showCarousel(): void {
    if (!this.images) {
      return;
    }
    let images = this.images.slice(this.startIndex, this.images.length);
    if (this.startIndex > 0 && this.startIndex < this.images.length) {
      images = images.concat(this.images.slice(0, this.startIndex));
    }
    this.dialog.open(CarouselDialogComponent, {
      width: '60%',
      height: '75%',
      data: {
        slides: images
      }
    });
  }
}
