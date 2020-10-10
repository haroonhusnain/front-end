import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Utils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    try {
      const isLoggedIn = await this.authenticationService.isLoggedIn();
      if (isLoggedIn) {
        return true;
      } else {
        Utils.showMagnificPopup('#sign-in-dialog');
        this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      Utils.showMagnificPopup('#sign-in-dialog');
      this.router.navigate(['/']);
      return false;
    }
  }
}
