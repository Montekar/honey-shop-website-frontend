import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../_services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.scss']
})
export class LoginDropdownComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
    return;
    }

    this.authenticationService.login(this.username.value, this.password.value)
      .subscribe(
        () => {
          this.router.navigate(['/about']);
        });
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
