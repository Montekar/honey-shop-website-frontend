import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { User } from '../_models/user'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators'
import { UserRegister } from '../_models/userRegister'

@Injectable({providedIn: 'root'})
export class AccountService {
  userSubject = new BehaviorSubject<User | null>(null);
  public user!: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let local = localStorage.getItem('user')
    if (local != null){
      this.userSubject.next(JSON.parse(local));
    }
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/Login`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(userRegister : UserRegister) {
    return this.http.post(`${environment.apiUrl}/user/register`, userRegister);
  }
}
