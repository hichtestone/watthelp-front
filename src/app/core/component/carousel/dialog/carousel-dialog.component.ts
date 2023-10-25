import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ImageInterface} from '../../../model/image.interface';

@Component({
  templateUrl: './carousel-dialog.component.html',
  styleUrls: ['./carousel-dialog.component.scss']
})
export class CarouselDialogComponent {
  images: ImageInterface[];

  constructor(
    private dialogRef: MatDialogRef<CarouselDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.afterOpened().subscribe(() => {
      this.images = data.slides;
    });
  }
}
