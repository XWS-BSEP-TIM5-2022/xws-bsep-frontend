import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('jwt');
    let roles;
    
    if (token != null){
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      roles = decodedJwtData.roles
      console.log("rola je "+ roles)
    }

    if (!this.auth.isAuthenticated() || !roles.includes(expectedRole)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}