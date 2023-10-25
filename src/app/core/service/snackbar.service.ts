import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {
  }

  public addMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = environment.snackbar_timer;

    this.snackBar.open(message, null, config);
  }
}
