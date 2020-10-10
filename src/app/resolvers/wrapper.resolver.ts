import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class WrapperResolver implements Resolve<any> {
    first = false;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    async resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {

        this.authenticationService.isLoggedIn().subscribe(response => { });
    }

}
