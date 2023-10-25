export class SavedSearch {
  id: string;
  name: string;
  values: any;

  constructor() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
  }
}
