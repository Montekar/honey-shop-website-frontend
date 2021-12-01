import { Injectable } from '@angular/core'
import { AuthenticationService } from '../_services/authentication.service'
import { CanActivate, Router } from '@angular/router'

@Injectable({providedIn: 'root'})
export class AuthGuard implements  CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  canActivate():boolean {
    if(this.authenticationService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
