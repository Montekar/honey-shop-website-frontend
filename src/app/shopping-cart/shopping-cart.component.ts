import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../_services/shopping-cart.service'
import { first } from 'rxjs/operators'
import { ShoppingCartItem } from '../_models/shoppingCartItem'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  allItems: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getAll()
      .pipe(first())
      .subscribe(cartItems => this.allItems = cartItems)
  }

  deleteItem(id: number){
    this.shoppingCartService.deleteItem(id)
  }

  updateItem(item: ShoppingCartItem){
    this.shoppingCartService.updateItem(item)
  }

}
