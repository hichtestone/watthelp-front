import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export class SplashScreenService {
  splashScreenEl;
  player: AnimationPlayer;

  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: any,
    private router: Router
  ) {
    this.splashScreenEl = this.document.body.querySelector('#splash-screen');

    // If the splash screen element exists...
    if (this.splashScreenEl) {
      // Hide it on the first NavigationEnd event
      const hideOnLoad = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.hide();
            hideOnLoad.unsubscribe();
          }
        }
      );
    }
  }

  /**
   * Display Splash screen
   */
  show(): void {
    this.player = this.animationBuilder.build([
      style({opacity: '0', zIndex: '99999'}),
      animate('100ms ease', style({opacity: '1'}))
    ]).create(this.splashScreenEl);

    this.player.play();
  }

  /**
   * Hide splash screen
   */
  hide(): void {
    this.player = this.animationBuilder.build([
      style({opacity: '1'}),
      animate('1000ms ease-in', style({opacity: '0', zIndex: '-10'}))
    ]).create(this.splashScreenEl);

    this.player.play();
  }
}
