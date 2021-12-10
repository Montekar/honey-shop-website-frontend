import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { ShoppingCartItem } from '../_models/shoppingCartItem'
import { environment } from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class ShoppingCartService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  addItem(item: ShoppingCartItem){
    return this.http.post(`${environment.apiUrl}/shoppingCart`, item);
  }

  getAll(){
    return this.http.get<ShoppingCartItem>(`${environment.apiUrl}/shoppingCart`);
  }

  updateItem(item: ShoppingCartItem){
    return this.http.put<ShoppingCartItem>(`${environment.apiUrl}/shoppingCart`, item);
  }

  deleteItem(id: number){
    return this.http.delete(`${environment.apiUrl}/shoppingCart/${id}`)
  }

  getById(id: number){
    return this.http.get<ShoppingCartItem>(`${environment.apiUrl}/shoppingCart/${id}`);
  }
}
