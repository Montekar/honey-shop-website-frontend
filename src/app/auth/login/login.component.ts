import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../shared/auth.service'
import { LoginDto } from '../shared/login.dto'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alert: boolean = false

  constructor(private formBuilder: FormBuilder, private _router:Router,private _auth:AuthService) { }

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
          this._router.navigate(['home']);
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
