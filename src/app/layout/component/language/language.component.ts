import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {UserInterface} from '../../../user/model/user.interface';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmComponent} from '../../../core/component/dialog-confirm/dialog-confirm.component';
import {UserService} from '../../../user/service/user.service';
import {take} from "rxjs/operators";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  languages = ['en', 'fr', 'it'];
  userConnected: UserInterface;
  selected = '';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private translocoService: TranslocoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userConnected = this.authenticationService.currentUserValue;
    this.selected = this.userConnected.language;
    this.translocoService.setActiveLang(this.selected);
  }

  switchLanguage(language: string): void {
    if (language !== this.selected) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '350px',
        data: {
          title: this.translocoService.translate('layout.toolbar-menu.language-dialog.title'),
          description: this.translocoService.translate('layout.toolbar-menu.language-dialog.content'),
          submitButton: this.translocoService.translate('layout.toolbar-menu.language-dialog.confirm'),
          cancelButton: this.translocoService.translate('layout.toolbar-menu.language-dialog.cancel')
        }
      });
      dialogRef.afterClosed().subscribe(
        confirm => {
          if (!!confirm) {
            const operations = [{op: 'replace', path: '/language', value: language}];
            const expandData = 'client_logo, user_permission_codes';
            this.userService.patchUser(operations, expandData).pipe(take(1)).subscribe(
              (userUpdated: UserInterface) => {
                window.location.reload();

                this.userConnected = userUpdated;
                this.selected = this.userConnected.language;

                this.authenticationService.updateUser(userUpdated);
                this.translocoService.setActiveLang(this.selected);
              });
          }
        }
      );
    }
  }
}
