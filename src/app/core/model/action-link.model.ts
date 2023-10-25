export class ActionLink {
  routerLink: string;
  authorize: string[];
  iconTitle: string;
  buttonTitle: string;

  constructor(routerLink: string, authorize: string[], iconTitle: string, buttonTitle: string) {
    this.routerLink = routerLink;
    this.authorize = authorize;
    this.iconTitle = iconTitle;
    this.buttonTitle = buttonTitle;
  }
}
