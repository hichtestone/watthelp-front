import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileInterface} from '../../../model/file.interface';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

  @Input()
  file: FileInterface;

  @Input()
  files: FileInterface[] = [];

  @Output()
  remove = new EventEmitter<FileInterface>();

  get isImage(): boolean {
    return !!this.file.mime && this.file.mime.startsWith('image');
  }

  get images(): FileInterface[] {
    return this.files.filter(file => file.mime && file.mime.startsWith('image'));
  }

  get index(): number {
    return this.files.indexOf(this.file);
  }

  ngOnInit(): void {
    if (this.files.length === 0) {
      this.files = [this.file];
    }
  }

  onRemove(): void {
    this.remove.emit(this.file);
  }
}
