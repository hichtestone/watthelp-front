export class ActionUpload {
  authorize: string[];
  iconTitle: string;
  buttonTitle: string;

  constructor(authorize: string[], iconTitle: string, buttonTitle: string) {
    this.authorize = authorize;
    this.iconTitle = iconTitle;
    this.buttonTitle = buttonTitle;
  }
}
