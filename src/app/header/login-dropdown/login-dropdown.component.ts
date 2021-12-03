import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../_services/authentication.service'
import { Router } from '@angular/router'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.scss']
})
export class LoginDropdownComponent implements OnInit {
  loginForm: FormGroup;
  alert: boolean = false

  constructor(private formBuilder: FormBuilder,
              public authenticationService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
    return;
    }

    this.authenticationService.login(this.email.value, this.password.value)
      .subscribe({
        next: () => {
          this.alert=false;
          this.router.navigate(['/about']);
          this.loginForm.reset();
        },
        error: error => {
          this.alert=true;
        },
      });
  }

  closeAlert() {
    this.alert = false;
  }
}
