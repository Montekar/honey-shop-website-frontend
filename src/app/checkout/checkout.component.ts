import { Component, OnInit } from '@angular/core';
import { DetailDto } from "../customer-details/shared/detail.dto"
import { HttpErrorResponse } from "@angular/common/http"
import { CustomerDetailsService } from "../customer-details/shared/customer-details.service"

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public customerDetails:DetailDto[] = [];
  public stum

  constructor(private _detailService:CustomerDetailsService) { }

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
  }

}
