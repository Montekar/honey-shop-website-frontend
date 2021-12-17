import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth/shared/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed!: boolean;
  public  jwt: string | null | undefined;
  public isAdmin$: boolean | null | undefined;

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
