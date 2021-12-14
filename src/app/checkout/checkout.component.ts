import { Component, OnInit } from '@angular/core';
import { DetailDto } from "../customer-details/shared/detail.dto"
import { HttpErrorResponse } from "@angular/common/http"
import { CustomerDetailsService } from "../customer-details/shared/customer-details.service"
import { ShoppingCartService } from '../shopping-cart/shared/shopping-cart.service'
import { ProductCart } from '../shopping-cart/shared/product-cart'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public customerDetails:DetailDto[] = [];
  selectedDetail;

  constructor(private _detailService:CustomerDetailsService,private cartService:ShoppingCartService) { }
  products:ProductCart[];
  totalPrice:number = 0;

  public getCustomerDetails():void{
    this._detailService.getAllUserDetails().subscribe(
      (response: DetailDto[])=>{
        this.customerDetails = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      });
  }
  ngOnInit(): void {
    this.getCustomerDetails();
    this.products = this.cartService.getCart().products;
    this.calculateTotalPrice();
  }

  submitOrder() {
console.log(this.selectedDetail)
  }

  calculateTotalPrice(){
    var sum = 0;
    for(var product of this.products){
      sum+= product.quantity * product.product.price;
    }
    this.totalPrice = sum;
  }
}
