import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Router } from '@angular/router'
import { LoginDropdownComponent } from './login-dropdown/login-dropdown.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed!: boolean;

  constructor(public authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
