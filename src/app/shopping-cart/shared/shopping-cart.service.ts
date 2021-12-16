import { Injectable } from '@angular/core'
import { Product } from '../../_models/product'
import { Cart } from './cart'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() {

  }

  getCart():Cart{
    return JSON.parse(localStorage.getItem('cart'));
  }
  clearCart(){
    localStorage.removeItem("cart")
  }
  updateCart(updateCart:Cart){
    localStorage.setItem('cart',JSON.stringify(updateCart));
  }

  addToCart(addProduct:Product,quantity:number){
    var item = localStorage.getItem('cart');

    if(item==null || item.length<=0 || item=="undefined"){
      var cart ={
        products :[{
          product:addProduct,
          quantity : quantity}]
      }
      localStorage.setItem('cart',JSON.stringify(cart));
    }
      var retrieved:Cart = JSON.parse(localStorage.getItem('cart'));
      var ar = retrieved.products.filter(value => value.product.id == addProduct.id);

      if(ar.length == 0){
        retrieved.products.push({
          product:addProduct,
          quantity:quantity
        })
        localStorage.setItem('cart',JSON.stringify(retrieved));
      }else if(ar.length == 1){
        var objIndex = retrieved.products.findIndex(value => value.product.id == addProduct.id);

        var oldProductQuantity = retrieved.products[objIndex].quantity;
        retrieved.products[objIndex].quantity = +oldProductQuantity + +quantity;

        localStorage.setItem('cart',JSON.stringify(retrieved));
      }else{
        localStorage.removeItem("cart");
      }
  }
}
