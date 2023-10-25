import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-block',
  templateUrl: './form-block.component.html',
  styleUrls: ['./form-block.component.scss']
})
export class FormBlockComponent {
  @Input() title = '';
}
