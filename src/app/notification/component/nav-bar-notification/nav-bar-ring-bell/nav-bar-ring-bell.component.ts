import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-nav-bar-ring-bell',
  templateUrl: './nav-bar-ring-bell.component.html',
  styleUrls: ['./nav-bar-ring-bell.component.scss']
})
export class NavBarRingBellComponent {
  @Input() countUnread: number;
  @Input() newNotification: boolean;
}
