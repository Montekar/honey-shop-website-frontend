import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../_services/authentication.service'
import { Router } from '@angular/router'
import { first, map } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  alert: boolean = false
  submitted:boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    })
  }

  get email() {
    return this.registerForm.get('email') as FormControl
  }

  get password() {
    return this.registerForm.get('password') as FormControl
  }

  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm') as FormControl
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    if (this.password.value != this.passwordConfirm.value) {
      return
    }
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log("success")
          this.submitted = true;
          this.alert=true;
        },
        error: error => {
          console.log('failure')
          this.submitted = true;
          this.alert=false;
        },
      })
  }

closeAlert(){
    this.submitted=false;
}
}
