import {Component, Input} from '@angular/core';
import {UserInterface} from '../../../user/model/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings.component.html',
  styleUrls: ['../menu/menu.component.scss']
})
export class SettingsComponent {
  currentUser: UserInterface;

  constructor(private router: Router) {
  }

  @Input()
  set user(user: UserInterface) {
    this.currentUser = user;
  }

  gotoProfile(): void {
    this.router.navigate([`/user/${this.currentUser.id}`]);
  }
}
