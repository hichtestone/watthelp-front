import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AclService} from '../service/acl.service';

@Directive({
  selector: '[appAuthorized]',
})
export class AuthorizedDirective implements OnInit {
  context: AuthorizedContext = new AuthorizedContext();
  thenTemplateRef: TemplateRef<AuthorizedContext> | null = null;

  constructor(
    private eltRef: ElementRef,
    private aclService: AclService,
    private viewContainer: ViewContainerRef,
    templateRef: TemplateRef<AuthorizedContext>) {
    this.thenTemplateRef = templateRef;
  }

  @Input()
  set appAuthorized(resource: string[]) {
    this.context.resource = resource;
  }

  ngOnInit(): void {
    this.updateView();
  }

  private isAuthorized(): boolean {
    return !!this.context.resource.find(resource => this.aclService.hasAccess(resource));
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.isAuthorized()) {
      this.viewContainer.createEmbeddedView(this.thenTemplateRef, this.context);
    }
  }
}

/**
 * @stable
 */
export class AuthorizedContext {
  public resource: string[] = [];
}
