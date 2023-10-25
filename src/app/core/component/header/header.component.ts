import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ActionLink} from '../../model/action-link.model';
import {ActionUpload} from '../../model/action-upload.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  @Input()
  title: string;
  @Input()
  icon: string;
  @Input()
  svgIcon: string;
  @Input()
  mode: string;
  @Input()
  hideBreadcrumb = false;
  @Input()
  actionLink: ActionLink;
  @Input()
  actionUpload: ActionUpload;
  @Input()
  actionCreate: ActionUpload;

  @Output()
  uploadButtonSelected = new EventEmitter();

  @Output()
  createButtonSelected = new EventEmitter();

  openUpload(): void {
    this.uploadButtonSelected.emit();
  }

  openCreate(): void {
    this.createButtonSelected.emit();
  }
}
