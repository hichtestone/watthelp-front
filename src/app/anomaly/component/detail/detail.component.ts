import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AnomalyInterface} from '../../model/anomaly.interface';
import {NoteInterface} from '../../model/note.interface';
import {UserInterface} from '../../../user/model/user.interface';
import {AnomalyService} from '../../service/anomaly-service';
import {NoteService} from '../../service/note-service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {TitleService} from '../../../layout/shared/title.service';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {AbstractFormComponent} from '../../../core/component/abstract-form.component';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends AbstractFormComponent implements OnInit {
  anomaly: AnomalyInterface;
  form: FormGroup;
  formNote: FormGroup;
  notes: NoteInterface[];
  currentUser: UserInterface;

  constructor(
    private fb: FormBuilder,
    private anomalyService: AnomalyService,
    private noteService: NoteService,
    private snackbarService: SnackbarService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.form = this.fb.group({
      status: ''
    });

    this.formNote = this.fb.group({
      content: ''
    });

    this.route.data
      .subscribe((data: { anomaly: AnomalyInterface }) => {
        this.anomaly = data.anomaly;
        this.notes = this.anomaly.notes;
        this.form.patchValue(data.anomaly);
      });
  }

  patchStatus(): void {
    const operations = [{op: 'replace', path: '/status', value: this.form.value.status}];
    this.anomalyService.patch(this.anomaly.id, operations).subscribe(
      (anomaly: AnomalyInterface) => {
        this.anomaly = anomaly;
        this.snackbarService.addMessage(this.translocoService.translate('anomaly.status-updated'));
      },
      (error) => {
        this.handleFormError(error);
      }
    );
  }

  postComment(): void {
    const content = this.formNote.controls.content.value;
    this.noteService.postNote(this.anomaly.id, {content}, 'note_user').subscribe(
      (note: NoteInterface) => {
        this.snackbarService.addMessage(this.translocoService.translate('anomaly.note-created'));
        note.user.first_name = this.currentUser.first_name;
        note.user.last_name = this.currentUser.last_name;
        this.anomaly.notes.push(note);
        this.formNote.controls.content.setValue('');
      },
      (error) => {
        this.handleFormError(error);
      }
    );
  }
}
