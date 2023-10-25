import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NoteInterface} from '../../../model/note.interface';
import {UserInterface} from '../../../../user/model/user.interface';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input()
  formNote: FormGroup;

  @Input()
  notes: NoteInterface[];

  @Input()
  currentUser: UserInterface;

  @Output()
  postComment = new EventEmitter<void>();

  onPostComment(): void {
    this.postComment.emit();
  }
}
