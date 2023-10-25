import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {UserInterface} from '../../../user/model/user.interface';
import {AuthenticationService} from '../../../core/service/authentication.service';
import {StorageService} from '../../../core/service/storage.service';
import {ClientInterface} from '../../../user/model/client.interface';
import {TranslocoService} from "@ngneat/transloco";

declare function require(moduleName: string): any;

const {version: appVersion} = require('../../../../../package.json');

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  user: UserInterface;
  client: ClientInterface;
  isMobileView: boolean;
  appVersion: string;
  sidenav: ElementRef;
  destroy$ = new Subject<boolean>();

  constructor(
    private storageService: StorageService,
    private router: Router,
    private translocoService: TranslocoService,
    private authenticationService: AuthenticationService
  ) {
    this.appVersion = appVersion;
  }

  @ViewChild('sidenav', {static: false})
  set content(content: ElementRef) {
    if (!!content) {
      this.sidenav = content;
    }
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.client = JSON.parse(localStorage.getItem('client')) || null;
    this.translocoService.setActiveLang(JSON.parse(localStorage.getItem('user')).language);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Logout function, remove token, client and user from storage and redirect to login page.
   */
  public logout(): void {
    this.storageService.removeItem('token');
    this.storageService.removeItem('client');
    this.storageService.removeItem('user');
    this.router.navigate(['/login']);
  }
}
