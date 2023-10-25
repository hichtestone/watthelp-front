import {Directive, HostBinding, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ExpandService} from '../service/expand.service';

@Directive({
  selector: '[appCdkDetailRow]'
})
export class CdkDetailRowDirective {
  private row: any;
  private tRef: TemplateRef<any>;
  private opened: boolean;

  constructor(public vcRef: ViewContainerRef, private expandService: ExpandService) {
    this.expandService.currentExpandedChange.subscribe((row) => {
      if (row === this.row) {
        this.render();
      } else {
        this.vcRef.clear();
      }

      this.opened = this.vcRef.length > 0;
    });
  }

  @HostBinding('class.expanded')
  get expended(): boolean {
    return this.opened;
  }

  @Input('appCdkDetailRow')
  set cdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('appCdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, {$implicit: this.row});
    }
  }
}
