import {Component} from '@angular/core';

declare function require(moduleName: string): any;

const {version: appVersion} = require('../../../../../package.json');

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  appVersion: string;

  constructor() {
    this.appVersion = appVersion;
  }
}
