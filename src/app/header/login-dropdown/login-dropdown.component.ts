import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { catchError, first } from 'rxjs/operators'
import { AuthService } from '../../auth/shared/auth.service'
import { LoginDto } from '../../auth/shared/login.dto'
import { throwError } from 'rxjs'

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.scss']
})
export class LoginDropdownComponent implements OnInit {
  loginForm: FormGroup;
  alert: boolean = false
  public  jwt: string | null | undefined;

  constructor(private formBuilder: FormBuilder,
              public _auth:AuthService,
              private router:Router) {
    _auth.isLoggedIn$.subscribe(jwt =>{
      this.jwt = jwt;
    })
  }

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
    const loginDto = this.loginForm.value as LoginDto;

    this._auth.login(loginDto).pipe(
      catchError(err => {
        if(err.error){
          this.alert = true;
        }
        return throwError(err);
      })
    )
      .subscribe(token =>{
        if(token && token.jwt){
          this.loginForm.disable();
          this.router.navigate(['home']);
          this.loginForm.reset();
          this.loginForm.enable();
          this.alert = false;
        }
      });
  }

  closeAlert() {
    this.alert = false;
  }
}
