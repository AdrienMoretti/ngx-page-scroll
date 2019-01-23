import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // public isDebugEnabled = PageScrollConfig._logLevel >= 5;
  public currentTabIndex = 0;
  public links = [
    {
      route: ['/'],
      name: 'Home',
    },
    {
      route: ['/simple'],
      name: 'Simple Scrolling',
    },
    {
      route: ['/nested'],
      name: 'Nested Scrolling',
    },
    {
      route: ['/router'],
      name: 'Router Scrolling',
    },
    {
      route: ['/horizontal'],
      name: 'Horizontal Scrolling',
    },
    {
      route: ['/translated'],
      name: 'Trnsf. Target Scrolling',
    },
    {
      route: ['/namespace'],
      name: 'Namespace Feature',
    }];

  constructor(private router: Router, private pageScrollService: PageScrollService) {
    router.events.subscribe((event) => {
      // see also
      if (event instanceof NavigationEnd) {
        this.links.forEach((link, index) => {
          if (router.isActive(router.createUrlTree(link.route), false)) {
            this.currentTabIndex = index;
          }
        });
      }
    });
  }

  // TODO Manipulate settings after instance creation
  /*
  public setDebug(debug: { checked: boolean, source: MatCheckbox }) {
    console.warn('Debug mode has been ' + (debug.checked ? 'en' : 'dis') + 'abled');
    this.isDebugEnabled = debug.checked;
    PageScrollConfig._logLevel = this.isDebugEnabled ? 5 : 2;
  }*/

  public tabChange(event: any) {
    // Select the correct route for that tab
    const routeObj = this.links[event.index];
    if (routeObj && routeObj.route) {
      this.router.navigate(routeObj.route);
    }
  }
}
