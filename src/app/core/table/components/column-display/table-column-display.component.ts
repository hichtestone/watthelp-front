import {Component, Inject, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Column} from '../../model/column';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './table-column-display.component.html',
  styleUrls: ['./table-column-display.component.scss']
})
export class TableColumnDisplayComponent implements OnInit {

  fixedAtTheBeginning: Column[] = [];
  fixedAtTheEnd: Column[] = [];
  draggableColumns: Column[] = [];

  defaultColumns: Column[];
  columns: Column[];

  constructor(
    public dialogRef: MatDialogRef<TableColumnDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.defaultColumns = [...data.defaultColumns];
    if (!!data.columns) {
      this.columns = JSON.parse(JSON.stringify(data.columns)); // clone array without object reference
      this.columns.forEach((column: Column) => {
        // Add fixed column
        if (!column.draggable) {
          if (this.draggableColumns.length === 0) {
            this.fixedAtTheBeginning.push(column);
          }
          if (this.draggableColumns.length > 0) {
            this.fixedAtTheEnd.push(column);
          }
        }

        // Add draggable column
        if (column.draggable) {
          this.draggableColumns.push(column);
        }
      });
    }
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.draggableColumns, event.previousIndex, event.currentIndex);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close([...this.fixedAtTheBeginning, ...this.draggableColumns, ...this.fixedAtTheEnd]);
  }

  reset(): void {
    this.dialogRef.close(this.defaultColumns);
  }

  trackByKey(index, item): any {
    return item.key;
  }
}
