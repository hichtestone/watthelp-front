import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class TitleService {

  @Output()
  titleChanged = new EventEmitter();

  public setTitle(title: string): void {
    this.titleChanged.emit(title);
  }
}
