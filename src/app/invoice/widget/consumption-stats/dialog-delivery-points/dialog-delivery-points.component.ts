import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeliveryPointInterface} from '../../../../delivery-point/model/delivery-point.interface';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  templateUrl: './dialog-delivery-points.component.html',
  styleUrls: ['./dialog-delivery-points.component.scss']
})
export class DialogDeliveryPointsComponent {
  title: string;
  submitButton: string;
  cancelButton: string;

  constructor(
    private dialogRef: MatDialogRef<DialogDeliveryPointsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.cancelButton = data.cancelButton || 'Annuler';
  }

  onSubmitSelection($event: { selection: SelectionModel<DeliveryPointInterface | string>; delivery_point_filters: any, total: number }): void {
    const data = {
      delivery_point_filters: $event.selection.isSelected('*')
        ? $event.delivery_point_filters
        : {ids: $event.selection.selected.map((item: DeliveryPointInterface) => item.id)},

      total: $event.total
    };

    this.dialogRef.close(data);
  }
}
