import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserServiceService} from "../services/user.service.service";

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(private auth: UserServiceService,
              private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['account/login'])
      return false;
    }
    return this.auth.isLoggedIn();
  }

}
