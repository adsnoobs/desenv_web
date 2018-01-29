import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class CanActivateGuardService implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const url = state.url;
        if (!this.loginService.estaLogado()) {
            this.loginService.redirecionar = url;
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
