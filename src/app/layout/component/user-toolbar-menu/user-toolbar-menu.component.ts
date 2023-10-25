import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInterface} from '../../../user/model/user.interface';
import {ClientInterface} from '../../../user/model/client.interface';

@Component({
  selector: 'app-user-toolbar-menu',
  templateUrl: './user-toolbar-menu.component.html',
  styleUrls: ['./user-toolbar-menu.component.scss']
})
export class UserToolbarMenuComponent {
  @Input()
  user: UserInterface;

  @Input()
  client: ClientInterface;

  @Input()
  appVersion: string;

  @Output()
  logout = new EventEmitter();

  public disconnect(): void {
    this.logout.emit();
  }
}
