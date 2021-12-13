import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service'
import { first } from 'rxjs/operators'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ShoppingCartService } from '../_services/shopping-cart.service'
import { ShoppingCartItem } from '../_models/shoppingCartItem'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: any;
  amount: number = 0;
  honeyForm: FormGroup;

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.allProducts = products)

    this.honeyForm = this.formBuilder.group({
      honey: [null],
      honeyAmount: [null]
    })
  }

  getHoneyProducts() {
    return this.allProducts.filter( product => product.name.includes("Honey"));
  }

  getBreadProducts() {
    return this.allProducts.filter( product => product.name.includes("Bread"));
  }

  getSoapProducts() {
    return this.allProducts.filter( product => product.name.includes("Soap"));
  }

  addToShoppingCart(type: string) {
    let item = new ShoppingCartItem();
    if (type === "honey"){
      item.product = this.honeyForm.value.honey;
      item.amount = this.honeyForm.value.honeyAmount;
    }

    this.shoppingCartService.addItem(item)
      .pipe(first())
      .subscribe(
        data => {
          console.log("Yey");
        },
        error => {
          console.log("Nah")
        }
      )
  }
}
