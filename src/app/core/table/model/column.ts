export class Column {
  name: string;
  key: string;
  enabled = true;
  draggable = true;

  constructor(name: string, key: string, enabled = true, draggable = true) {
    this.name = name;
    this.key = key;
    this.enabled = enabled;
    this.draggable = draggable;
  }
}
