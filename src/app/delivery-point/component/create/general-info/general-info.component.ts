import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ContractInterface} from '../../../../contract/model/contract.interface';
import {AbstractFormComponent} from '../../../../core/component/abstract-form.component';
import {FileInterface} from '../../../../core/model/file.interface';

@Component({
  selector: 'app-delivery-point-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent extends AbstractFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() zoom = 9;
  @Input() isEditMode = false;
  @Input() contracts: ContractInterface[];
  @Input() files: FileInterface[] = [];
  @Input() mode = '';
  isLoading = false;
  marker: { lat: number, lng: number };

  @Input() set errors(errors) {
    this.handleFormError(errors);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(data => {
      if (!!data.latitude && !!data.longitude) {
        this.marker = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        };
      }
    });
  }
}
