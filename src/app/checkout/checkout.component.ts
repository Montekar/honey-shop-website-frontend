import { Component, OnInit } from '@angular/core';
import { DetailDto } from "../customer-details/shared/detail.dto"
import { HttpErrorResponse } from "@angular/common/http"
import { CustomerDetailsService } from "../customer-details/shared/customer-details.service"
import { ShoppingCartService } from '../shopping-cart/shared/shopping-cart.service'
import { ProductCart } from '../shopping-cart/shared/product-cart'
import { Router } from '@angular/router'
import { EmailService } from "../_services/email.service"
import { Email } from "../_models/email"
import { AuthService } from "../auth/shared/auth.service"
import { OrderService } from "../_services/order.service"
import { Order } from "../_models/order"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public customerDetails:DetailDto[] = [];
  selectedDetail;

  constructor(private _detailService:CustomerDetailsService,private cartService:ShoppingCartService,private _router:Router,private _emailService:EmailService,private _auth:AuthService,private _orderService:OrderService) { }
  products:ProductCart[];
  totalPrice:number = 0;
  orderNumber;

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

    if(this.products==null || this.products.length<=0){
      console.log("its null")
      this._router.navigate(['cart']);
    }
    this.calculateTotalPrice();
  }

  submitOrder() {
    if(this.selectedDetail!=null && this.orderNumber==null){
    var thanksMessage = "Thank you for ordering with us, "+this._detailService.getFullNameAsString(this.selectedDetail)+"!\n\n";
    var orderMessage="Order Details: \n";
    orderMessage+=this.getProductsAsString();
    orderMessage+="\nTotal Price: "+this.totalPrice+" €\n\n";
    var deliveryMessage = "Your Phone Number: "+this.selectedDetail.phoneNumber +"\n"+"Your Delivery Address: "+this._detailService.getAddressAsString(this.selectedDetail)+"\n\n";
    var paymentDetails ="Use our provided bank number for the transaction and put your order number into the section for the purpose of the payment: \n\nBank number: LT00099999999\n\nYou will get a confirmation letter when money is received."

    var order:Order = {
      id:0,
      customerId:this._auth.getUserID(),
      orderCompleted:false,
      orderPaid:false
    }
      var btn = <HTMLInputElement> document.getElementById("orderButton");

    this._orderService.create(order).subscribe((response: Order)=>{
        var email:Email = {
          receiverEmail: this._auth.getUserEmail(),
          subject: "Unpaid Order №:"+response.id+" has been created! - HoneyShop",
          body: thanksMessage+orderMessage+deliveryMessage+paymentDetails
        }
        btn.disabled = true;
        this._emailService.send(email).subscribe(()=>{
          this.cartService.clearCart();
          this.orderNumber = response.id;
          },
          (error:HttpErrorResponse) => {
            alert(error.message);
          });
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      });
    btn.disabled=false;
    }
  }
  private getProductsAsString():string{
    var productMessage="";
    this.products.forEach(value => {
      productMessage+=value.quantity+"x ";
      productMessage+=value.product.name +" : ";
      productMessage+=value.product.description+"\n";
    });
    return productMessage;
  }
  calculateTotalPrice(){
    var sum = 0;
    for(var product of this.products){
      sum+= product.quantity * product.product.price;
    }
    this.totalPrice = sum;
  }
}
