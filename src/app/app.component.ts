declare const $: any;
import { Component } from '@angular/core';
import { Utils } from './utils';
import { NavigationStart, NavigationEnd, NavigationError, NavigationCancel, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lugg';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        Utils.blockPage();
      } else if ((event instanceof NavigationEnd) || (event instanceof NavigationError) || (event instanceof NavigationCancel)) {
        const body = $('html, body');
        body.stop().animate({ scrollTop: 0 }, 500, 'swing', () => {
        });
        Utils.unblockPage();
      }
    });
  }
}
