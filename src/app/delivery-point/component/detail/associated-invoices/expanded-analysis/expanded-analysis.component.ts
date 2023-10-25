import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ItemAnalysesInterface} from '../../../../../invoice/model/delivery-point-invoice/item-analyses.interface';

@Component({
  selector: 'app-expanded-analysis',
  templateUrl: './expanded-analysis.component.html',
  styleUrls: ['./expanded-analysis.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class ExpandedAnalysisComponent implements OnInit {

  @Input() colspan: number;
  @Input() itemAnalysis: ItemAnalysesInterface[];

  subscriptions: ItemAnalysesInterface[];
  taxes: ItemAnalysesInterface[];
  consumptions: ItemAnalysesInterface[];
  globals: ItemAnalysesInterface[];

  constructor() {
  }

  ngOnInit(): void {
    if (!!this.itemAnalysis) {
      this.subscriptions = this.itemAnalysis.filter(item => item.group?.indexOf('subscription') !== -1);
      this.consumptions = this.itemAnalysis.filter(item => item.group?.indexOf('consumption') !== -1);
      this.taxes = this.itemAnalysis.filter(item => item.group?.indexOf('tax') !== -1);
      this.globals = this.itemAnalysis.filter(item => item.group?.indexOf('default') !== -1);
    }
  }
}
