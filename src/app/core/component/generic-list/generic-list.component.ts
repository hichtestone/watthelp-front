import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionLink} from '../../model/action-link.model';
import {ActionUpload} from '../../model/action-upload.model';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent {
  @Input() actionLink: ActionLink;
  @Input() actionImport: ActionUpload;
  @Input() actionCreate: ActionUpload;
  @Input() headerIcon: string;
  @Input() headerMode = 'list';
  @Input() headerTitle: string;
  @Output() uploadButtonSelected = new EventEmitter();
  @Output() createButtonSelected = new EventEmitter();

  // This property tells the component whether we want to display a filter or not
  @Input() withFilter = true;
  @Input() displayHeader = true;
}
