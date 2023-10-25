import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Add item into local storage
   */
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Get item from local storage
   */
  public getItem(key: string): any {
    return localStorage.getItem(key);
  }

  /**
   * Remove item from local storage
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
