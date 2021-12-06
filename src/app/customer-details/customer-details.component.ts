import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from '../_services/customer-details.service'
import { CustomerDetail } from '../_models/customerDetail'
import { AuthenticationService } from '../_services/authentication.service'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customerDetails:CustomerDetail[] = [{ id: 1,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"Faustas",lastName:"Anulis"},
    { id: 2,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"Faustas",lastName:"Anulis"},
    { id: 3,addressCity:"Silale",addressCountry:"Lithuania",addressPostCode:7501, addressNumber:"10",addressStreet:"Poskos",phoneNumber:"+4532532",firstName:"Faustas",lastName:"Anulis"}];
  public editCustomerDetail:CustomerDetail;
  public deleteCustomerDetail: CustomerDetail;

  constructor(private detailService:CustomerDetailsService, public auth:AuthenticationService) { }

  public getCustomerDetails():void{
    this.detailService.getAll().subscribe();
  }

  ngOnInit(): void {
  }

  onOpenModal(detail:CustomerDetail,mode:string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addDetailModal');
    }
    if(mode === 'edit'){
      this.editCustomerDetail = detail;
      button.setAttribute('data-target','#updateDetailModal');
    }
    if(mode === 'delete'){
      this.deleteCustomerDetail = detail;
      button.setAttribute('data-target','#deleteDetailModal');
    }
    container.appendChild(button);
    button.click();
  }

  onAddCustomerDetail(addForm: NgForm): void {
    var form = addForm.form.value;
    var customerDetail = { id: 4,addressCity:form.city,addressPostCode:form.postCode,addressNumber:form.houseNumber,phoneNumber:form.phone,addressCountry:form.country,addressStreet:form.street,firstName:form.firstName,lastName:form.lastName};
    this.customerDetails.push(customerDetail);
    document.getElementById('add-detail-form').click();
    addForm.reset();
  }

  onUpdateCustomerDetail(detail:CustomerDetail) {
    var itemToUpdate = this.customerDetails.filter(value => value.id==detail.id)[0];
    var index = this.customerDetails.indexOf(itemToUpdate);
    this.customerDetails[index] = detail;
  }

  onDeleteCustomerDetail(deleteCustomerDetail: CustomerDetail) {
    for( var i = 0; i < this.customerDetails.length; i++){

      if ( this.customerDetails[i].id === deleteCustomerDetail.id) {

        this.customerDetails.splice(i, 1);
      }
    }
  }
}
