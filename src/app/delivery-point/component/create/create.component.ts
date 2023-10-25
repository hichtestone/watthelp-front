import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {take} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {DeliveryPointInterface} from '../../model/delivery-point.interface';
import {DeliveryPointService} from '../../service/delivery-point.service';
import {MapsAPILoader} from '@agm/core';
import {SimpleDataSource} from '../../../core/datasource/simple.datasource';
import {MatPaginator} from '@angular/material/paginator';
import {FileInterface} from '../../../core/model/file.interface';
import {TableDataSource} from '../../../core/table/datasource/table-datasource';
import {PowerHistoryInterface} from '../../model/power-history.interface';
import {AclService} from '../../../core/service/acl.service';
import {TranslocoService} from "@ngneat/transloco";

declare var google: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  title = 'deliverypoint.breadcrumb.dp-creation';
  form: FormGroup;
  deliveryPoint: DeliveryPointInterface;
  dataSource: SimpleDataSource | null;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  zoom = 9;
  pattern = '[0-9]+([.][0-9]{1,1})?';
  mode = '';
  budgetAccess = false;
  consumptionAccess = false;
  budgetExist = false;

  errors: any;
  isEditMode = false;
  files: FileInterface[] = [];

  powerHistoryDataSource = new TableDataSource<PowerHistoryInterface>([]);

  constructor(protected fb: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected snackbarService: SnackbarService,
              protected deliveryPointService: DeliveryPointService,
              protected translocoService: TranslocoService,
              protected aclService: AclService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      code: '',
      description: '',
      contract: ['', Validators.required],
      address: ['', Validators.required],
      latitude: '',
      longitude: '',
      scope_date: {value: '', disabled: true},
      is_in_scope: '',
      meter_reference: ['', Validators.required],
      power: ['', Validators.compose([Validators.required, Validators.pattern(this.pattern)])],
    });
  }

  ngOnInit(): void {
    this.form.controls.address.valueChanges
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe((value => {
        if (!!value) {
          this.getGeoLocation(value);
        }
      }));
  }

  getGeoLocation(address: string): void {
    this.mapsAPILoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({address}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.ngZone.run(() => {
            this.zoom = 11;
            this.form.controls.latitude.patchValue(results[0].geometry.location.lat());
            this.form.controls.longitude.patchValue(results[0].geometry.location.lng());
          });
        } else {
          throw new Error(`Error: ${status}`);
        }
      });
    });
  }

  submit(): void {
    this.deliveryPointService.post(this.prepareDataToSubmit(this.form.getRawValue()))
      .pipe(take(1))
      .subscribe(
        () => {
          this.snackbarService.addMessage(this.translocoService.translate('deliverypoint.list.delivery-point-created'));
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (error) => this.errors = error
      );
  }

  prepareDataToSubmit(values): any {
    delete values.is_in_scope;
    delete values.scope_date;

    let file: FileInterface = null;
    if (this.files.length > 0) {
      file = this.files[0];
    }

    return {
      ...values,
      photo: file ? file.id : null,
      contract: !!values.contract ? values.contract.id : null,
      latitude: parseFloat(values.latitude).toString(),
      longitude: parseFloat(values.longitude).toString()
    };
  }

  destroy(): void {
  }
}
