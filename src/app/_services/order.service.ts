import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Order} from "../_models/order";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  create(order: Order) {
    return this.http.post(`${environment.apiUrl}/order`, order);
  }

  getAll() {
    return this.http.get<Order>(`${environment.apiUrl}/order`);
  }

  getById(id: number) {
    return this.http.get<Order>(`${environment.apiUrl}/order/${id}`);
  }

  update(order: Order) {
    return this.http.put(`${environment.apiUrl}/order`, order);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/order/${id}`);
  }
}
