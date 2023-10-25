import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {SnackbarService} from '../../../core/service/snackbar.service';
import {NotificationInterface} from '../../model/notification.interface';
import {environment} from '../../../../environments/environment';
import {NotificationDataInterface} from '../../model/notification-data.interface';
import {Router} from '@angular/router';
import {NotificationTypeEnum} from '../../model/notification-type.enum';
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-nav-bar-notification',
  templateUrl: './nav-bar-notification.component.html',
  styleUrls: ['./nav-bar-notification.component.scss']
})
export class NavBarNotificationComponent implements OnInit {
  @Input() currentRootPath;

  notifications: Array<NotificationInterface> = [];
  notification: NotificationInterface;

  countUnread = 0;
  messageLimit = 100;

  completeWord = true;
  showAll = false;

  timeLeft = 4;
  interval: any;

  newNotification = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private translocoService: TranslocoService,
    private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {

    this.getNotifications();

    // On notification deletion update notification nav-bar
    this.notificationService.notificationDeleted.subscribe((ids: number[]) => {
      if (!!ids) {
        this.notifications = this.notifications.filter((notification: NotificationInterface) => {
          return ids.indexOf(notification.id) === -1;
        });
      } else {
        this.notifications = [];
      }

      this.updateCountUnread();
    });
  }

  initProgressListener(hubKey: string): void {
    const url = new URL(environment.mercure_hub);
    url.searchParams.append('topic', environment.mercure_path + '/notification/' + hubKey);
    const es = new EventSource(url.href);
    es.onmessage = e => {
      const data = JSON.parse(e.data);
      const exist = this.notifications.find(n => n.id === data.notification.id);

      if (!!exist) {
        this.notifications = this.notifications
          .map(notification => notification.id === data.notification.id ? data.notification : notification);
      } else {
        this.notifications.unshift(data.notification);
      }

      this.updateCountUnread();
    };
  }

  getNotifications(): void {
    const data = {
      page: 1,
      per_page: 100,
      sort: 'created_at',
      sort_order: 'desc'
    };

    this.notificationService.receivedNotifications(data).subscribe((response) => {
      this.notifications = response.body.data;
      this.updateCountUnread();
      this.initProgressListener(response.headers.get('x-mercure-uri'));
    });
  }

  updateCountUnread(): void {
    const unreadNotifications = this.notifications.filter((notification: NotificationInterface) => {
      return notification.is_read === false;
    });

    if (this.countUnread > 0) {
      this.newNotification = true;

      // Ring the bell for 4 seconds
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;

        } else {
          this.newNotification = false;
          this.timeLeft = 4;
        }
      }, 1000);

    } else {
      this.newNotification = false;
      clearInterval(this.interval);
    }

    this.countUnread = unreadNotifications.length;
  }

  markAsRead($event: any, id): void {
    $event.stopPropagation();
    if (this.countUnread > 0) {
      this.notifications.forEach((notification) => {
        if (id === notification.id && notification.is_read === false) {
          notification.is_read = true;
          this.countUnread -= 1;

          const operations = [{op: 'replace', path: '/read', value: true}];
          this.notificationService.patch(id, operations).subscribe(
            () => {
            },
            () => {
              this.getNotifications();
              this.snackbarService.addMessage(this.translocoService.translate('layout.toolbar-menu.notification-bar.update-error'));
            }
          );
        }
      });
    }
  }

  markAllAsRead(): void {
    if (this.countUnread > 0) {
      this.notifications.forEach((notification) => {
        notification.is_read = true;
      });
      this.countUnread = 0;

      const operations = [{op: 'replace', path: '/read', value: true}];
      this.notificationService.patch('*', operations).subscribe(
        () => {
        },
        () => {
          this.getNotifications();
          this.snackbarService.addMessage(this.translocoService.translate('layout.toolbar-menu.notification-bar.update-error'));
        }
      );
    }
  }

  goToDetail(data: NotificationDataInterface): void {
    switch (data.report_type) {
      case NotificationTypeEnum.INVOICE:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;

      case NotificationTypeEnum.SCOPE:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;

      case NotificationTypeEnum.ANALYSIS:
        this.router.navigate([`/analysis-report/${data.report_id}`]);
        break;
      case NotificationTypeEnum.BUDGET:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;
      case NotificationTypeEnum.PRICING:
        this.router.navigate([`/import-report/${data.report_id}`]);
        break;
    }
  }

  triggerReadMore(): void {
    this.showAll = !this.showAll;
  }
}
