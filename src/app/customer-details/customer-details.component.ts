import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from '../_services/customer-details.service'
import { CustomerDetail } from '../_models/customerDetail'
import { AuthenticationService } from '../_services/authentication.service'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customerDetails:CustomerDetail[] = [{ id: 1,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"faustas",lastName:"lol"},
    { id: 2,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"faustas",lastName:"lol"},
    { id: 3,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"faustas",lastName:"lol"}];

  constructor(private detailService:CustomerDetailsService, public auth:AuthenticationService) { }

  public getCustomerDetails():void{
    this.detailService.getAll().subscribe();
  }

  ngOnInit(): void {
  }

  onOpenModal(param, add: string) {

  }
}
