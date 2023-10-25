import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {SplashScreenService} from './core/service/splash-screen.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private splashScreenService: SplashScreenService,
    private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('man', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/man.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/settings.svg'));
    iconRegistry.addSvgIcon('dashboard', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/dashboard.svg'));
    iconRegistry.addSvgIcon('bar-stats', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/bar-stats.svg'));
  }
}
