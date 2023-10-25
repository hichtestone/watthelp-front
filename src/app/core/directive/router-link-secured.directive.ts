import {Attribute, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AclService} from '../service/acl.service';

@Directive({
  selector: ':not(a)[routerLinkSecured]',
})
export class RouterLinkSecuredDirective extends RouterLink {
  @Input('queryResource') queryResources: string[];

  constructor(router: Router,
              route: ActivatedRoute,
              @Attribute('tabindex') tabIndex: string,
              renderer: Renderer2,
              el: ElementRef,
              private aclService: AclService) {
    super(router, route, tabIndex, renderer, el);
  }

  @Input('routerLinkSecured')
  set routerLinkSecured(commands: any[] | string) {
    this.routerLink = commands;
  }

  @HostListener('click')
  onClick(): boolean {
    this.queryResources.forEach((item) => {
      if (this.aclService.hasAccess(item)) {
        return super.onClick();
      }
    });

    return false;
  }
} 
