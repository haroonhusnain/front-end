import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalApiCallService } from '../helpers/global-service/global-api-call.service';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLogin = false;
  public profile: any;
  public state: EventEmitter<any> = new EventEmitter();

  constructor(
    private globalApiCallService: GlobalApiCallService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(body) {

    return this.globalApiCallService.postRequest(`${environment.apiBase}/auth/login`, body).pipe(
      map(response => {
        this.loginWithToken(response);
        this.router.navigate(['/']);
        return response;
      })
    );

  }

  signup(body) {

    return this.globalApiCallService.postRequest(`${environment.apiBase}/auth/signup`, body).pipe(
      map(response => {
        this.loginWithToken(response);
        this.router.navigate(['/']);
        return response;
      })
    );

  }

  loginWithToken(response: any) {

    localStorage.setItem('token', response.token);
    this.getProfile();
    this.isLogin = true;
    this.state.emit(this.isLogin);
    Utils.initNavbar();

    // if (this.profile.type === 'buddy' && !this.profile.is_registration_complete) {
    //   this.router.navigate(['/wizard/buddy-registration']);
    // }
  }

  async getProfile() {

    const response = this.globalApiCallService.getAuthenticatedRequest(`${environment.apiBase}/auth/getuser`);
    if (response) {
      this.profile = response;
      return this.profile;
    } else {
      return null;
    }

  }

  isLoggedIn() {

    return this.globalApiCallService.getAuthenticatedRequest(`${environment.apiBase}/auth/getuser`).pipe(
      map(response => {

        if (response.id) {
          this.isLogin = true;
          this.getProfile();
          Utils.initNavbar();
        }
        return this.isLogin;

      }));

  }

  logout() {

    localStorage.clear();
    this.isLogin = false;
    this.state.emit(this.isLogin);
    this.profile = null;
    Utils.initNavbar();

    return this.globalApiCallService.getAuthenticatedRequest(`${environment.apiBase}/auth/logout`);
    // if (this.router.isActive('/wizard', false)) {
    //   this.router.navigate(['/']);
    // }
  }

  requestPassword(body) {
    return this.globalApiCallService.postRequest(`${environment.apiBase}/auth/request-password`, body);
  }

  resetPassword(body) {
    return this.globalApiCallService.postRequest(`${environment.apiBase}/auth/reset-password`, body);
  }

  verifyCode(body) {
    return this.globalApiCallService.postRequest(`${environment.apiBase}/auth/verify-code`, body);
  }

}
