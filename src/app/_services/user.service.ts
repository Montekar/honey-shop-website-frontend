import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  create(user: User) {
    return this.http.post(`${environment.apiUrl}/user`, user);
  }

  getAll() {
    return this.http.get<User>(`${environment.apiUrl}/user`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/user/Update`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`);
  }
}
