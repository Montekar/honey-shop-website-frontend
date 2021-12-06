import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allProducts: any;
  amount: number = 0

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.allProducts = products)
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
}
