import {filter, takeUntil} from 'rxjs/operators';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {BreadcrumbInterface} from '../../model/breadcrumb.interface';
import {Subject} from 'rxjs';

const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  public breadcrumbs;
  public title: string;

  @Input()
  public rootPath = '';

  private destroy$ = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // Subscribe to the NavigationEnd event
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });

    // Generate breadcrumbs for the first loading page.
    this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  trackByIndex(index, item): any {
    return index;
  }

  /**
   * Returns array of BreadcrumbInterface objects that represent the breadcrumb
   */
  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbInterface[] = []): BreadcrumbInterface[] {

    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // Ignore: empty routeURL, route who doesn't have rootPath, route without breadcrumb configuration
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB) || !url.match(this.rootPath) || routeURL === '') {
        routeURL = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // append route URL to URL
      url += `/${routeURL}`;

      let label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];
      if (child.snapshot.data[ROUTE_DATA_BREADCRUMB] instanceof Object) {
        label = '';

        if (child.snapshot.data[ROUTE_DATA_BREADCRUMB].hasOwnProperty(routeURL)) {
          label = child.snapshot.data[ROUTE_DATA_BREADCRUMB][routeURL];
        }
      }

      // add breadcrumb
      const breadcrumb: BreadcrumbInterface = {
        label,
        params: child.snapshot.params,
        url
      };
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
