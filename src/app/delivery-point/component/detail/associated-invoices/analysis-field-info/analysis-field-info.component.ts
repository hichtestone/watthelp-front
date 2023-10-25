import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogInfoComponent} from '../../../../../core/component/dialog-info/dialog-info.component';
import {ItemAnalysesInterface} from '../../../../../invoice/model/delivery-point-invoice/item-analyses.interface';

@Component({
  selector: 'app-analysis-field-info',
  templateUrl: './analysis-field-info.component.html',
  styleUrls: ['./analysis-field-info.component.scss']
})
export class AnalysisFieldInfoComponent implements OnInit {

  messages: string[];
  status: string;
  @Input() givenField: string;
  @Input() itemAnalyses: ItemAnalysesInterface[];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!!this.itemAnalyses) {
      this.itemAnalyses.forEach(item => {
        if (item.status && item.messages && item.field === this.givenField) {
          this.status = item.status;
          this.messages = item.messages;
        }
      });
    }
  }

  info(messages: string[]): void {
    if (messages) {
      this.dialog.open(DialogInfoComponent, {
        width: '350px',
        data: {
          title: 'Information',
          description: messages.map(m => m + '<br>').join(' '),
          submitButton: 'Ok'
        }
      });
    }
  }
}
