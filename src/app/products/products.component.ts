import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ShoppingCartService } from '../shopping-cart/shared/shopping-cart.service'
import { ProductService } from './shared/product.service'
import { ProductCart } from '../shopping-cart/shared/product-cart'
import { Product } from '../_models/product'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: any;
  amount: number = 0;
  honeyForm: FormGroup;
  breadForm: FormGroup;
  soapForm: FormGroup;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,private cartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.allProducts = products)

    this.honeyForm = this.formBuilder.group({
      honey: [null],
      honeyAmount: [null]
    })
    this.breadForm = this.formBuilder.group({
      bread: [null],
      breadAmount: [null]
    })
    this.soapForm = this.formBuilder.group({
      soap: [null],
      soapAmount: [null]
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

  addToShoppingCart(type:string) {
    var product;
    var quantity;
    if(type=="honey"){
      product = this.honeyForm.value.honey;
      quantity = this.honeyForm.value.honeyAmount;
    }
    if(type=="soap"){
      product = this.soapForm.value.soap;
      quantity = this.soapForm.value.soapAmount;
    }
    if(type=="bread"){
      product = this.breadForm.value.bread;
      quantity = this.breadForm.value.breadAmount;
    }
    if(product ==null || quantity==null || quantity <= 0){
      console.log("incorrect form");
    }
    this.cartService.addToCart(product,quantity);
  }
}
