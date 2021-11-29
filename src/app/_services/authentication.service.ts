import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface User{
  username?:string;
  password?:string;
  passwordConfirm?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(environment.apiUrl + '/Login', {username, password})
      .pipe(map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
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
      return currentUser.username;
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
