import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Router } from '@angular/router'
import { LoginDropdownComponent } from './login-dropdown/login-dropdown.component'
import { AuthService } from '../auth/shared/auth.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed!: boolean;
  public  jwt: string | null | undefined;

  constructor(public _auth:AuthService,private router:Router) {
    _auth.isLoggedIn$.subscribe(jwt =>{
     this.jwt = jwt;
    })
  }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  onLogout() {
    this._auth.logout()
      .subscribe(loggedOut => {
        if (loggedOut) this.router.navigate(['/auth/login']);
      });
  }
}
