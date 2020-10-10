import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Utils } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.state.subscribe(state => {
      if (state) {
        // this.bindPusher();
        // this.getConversationsWithUnreadCount();
      }
      Utils.initNavbar();
    });
  }

  ngAfterViewInit() {
    Utils.initNavbar();
    Utils.initTabs();
  }

  showLoginDialog() {
    Utils.showMagnificPopup('#sign-in-dialog');
  }

  logout() {
    this.router.navigate(['/']);
    this.authenticationService.logout();
  }

}
