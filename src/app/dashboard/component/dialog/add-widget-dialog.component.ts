import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './add-widget-dialog.component.html',
  styleUrls: ['./add-widget-dialog.component.scss']
})
export class AddWidgetDialogComponent {
  groups;

  constructor(
    private dialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const groupWidgets = {};
    // Boucler pour récupérer les groupes.
    data.widgets.forEach(widget => {
      const config = widget.componentType.config;
      const group = config.group;

      if (!groupWidgets.hasOwnProperty(group)) {
        groupWidgets[group] = [];
      }
      groupWidgets[group].push(widget);
    });

    this.groups = groupWidgets;
  }

  selectWidget(widget): void {
    this.dialogRef.close(widget);
  }
}
