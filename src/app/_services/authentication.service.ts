import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface User{
  email?:string;
  password?:string;
  passwordConfirm?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(environment.apiUrl + '/Login', {email: email, password})
      .pipe(map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({email: email, token: token}));
          return true;
        } else {
          return false;
        }
      }));
  }

  register(user) {
    return this.http.post<any>(environment.apiUrl + '/Register', user).pipe(
      map(user => user)
    )
  }

  getUsername(): string | null {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));

    if (currentUser) {
      return currentUser.email;
    } else {
      return null;
    }
  }

  getToken(): string | null {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    if (currentUser) {
      return currentUser.token;
    } else {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  loggedIn(){
    return !!localStorage.getItem('currentUser');
  }
}
