import {Component, Input} from '@angular/core';
import {FileInterface} from '../../model/file.interface';
import {FileService} from '../../service/file.service';
import {DialogConfirmComponent} from '../dialog-confirm/dialog-confirm.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @Input()
  uploadLabel: string;

  @Input()
  uploadIcon: string;

  @Input()
  uploadType: string;

  @Input()
  files: FileInterface[] = [];

  @Input()
  file: FileInterface;

  fileUploading = false;
  fileUploadError: string;

  constructor(
    private fileService: FileService,
    private dialog: MatDialog) {
  }

  uploadFile(event): void {
    this.fileUploadError = null;
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.fileUploading = true;

      const fileToUpload: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.fileService.upload(formData).subscribe(
        (uploadedFile: FileInterface) => {
          this.fileUploading = false;
          this.files.push(uploadedFile);
        },
        (error) => {
          this.fileUploading = false;
        }
      );
    }
  }

  removeFile(file): void {
    const dialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Suppression d\'un fichier',
        description: 'Supprimer le fichier ?'
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.files.indexOf(file);
        this.files.splice(index, 1);
      }
    });
  }

}
