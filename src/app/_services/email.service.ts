import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Email } from "../_models/email"

@Injectable({providedIn: 'root'})
export class EmailService {
  constructor(
    private http: HttpClient
  ) {}

  send(email:Email) {
    return this.http.post(`${environment.apiUrl}/Email`, email);
  }
}
