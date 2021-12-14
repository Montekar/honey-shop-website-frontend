import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'
import { ShoppingCartService } from './shared/shopping-cart.service'
import { Product } from '../_models/product'
import { ProductCart } from './shared/product-cart'
import { Cart } from './shared/cart'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  allItems: any;
  products:ProductCart[];
  totalPrice:number = 0;

  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getCart().products;
    this.calculateTotalPrice();
  }

  onQuantityChanged() {
    var cart:Cart={products:this.products};
    this.cartService.updateCart(cart);
    this.calculateTotalPrice();
  }

  removeProduct(product: ProductCart) {
    var index = this.products.findIndex(value => value.product.id == product.product.id);
    this.products.splice(index, 1);

      var cart:Cart={products:this.products};
      this.cartService.updateCart(cart);
      this.calculateTotalPrice();
  }

  calculateTotalPrice(){
    var sum = 0;
    for(var product of this.products){
      sum+= product.quantity * product.product.price;
    }
    this.totalPrice = sum;
  }
}
