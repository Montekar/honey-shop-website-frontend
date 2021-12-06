import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CustomerDetail} from "../_models/customerDetail";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class CustomerDetailsService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  create(customerDetails: CustomerDetail) {
    return this.http.post(`${environment.apiUrl}/customerDetails`, customerDetails);
  }

  getAll() {
    return this.http.get<CustomerDetail>(`${environment.apiUrl}/customerDetails`);
  }

  getById(id: number) {
    return this.http.get<CustomerDetail>(`${environment.apiUrl}/customerDetails/${id}`);
  }

  update(customerDetails: CustomerDetail) {
    return this.http.put(`${environment.apiUrl}/customerDetails/Update`, customerDetails);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/customerDetails/${id}`);
  }
}
