import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from '../auth/shared/auth.service'
import { CustomerDetailsService } from './shared/customer-details.service'
import { HttpErrorResponse } from '@angular/common/http'
import { DetailDto } from './shared/detail.dto'
import { LoginDto } from '../auth/shared/login.dto'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customerDetails:DetailDto[] = [];
  public editCustomerDetail:DetailDto;
  public deleteCustomerDetail: DetailDto;

  constructor(private _detailService:CustomerDetailsService, public _auth:AuthService) { }

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

  onOpenModal(detail:DetailDto,mode:string): void {
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
    var detailDto = addForm.form.value as DetailDto;
    this._detailService.addUserDetail(detailDto).subscribe(
      (response:DetailDto) =>{
        console.log(detailDto);
        this.getCustomerDetails();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      });
    document.getElementById('add-detail-form').click();
    addForm.reset();
  }

  onUpdateCustomerDetail(detail:DetailDto) {
    this._detailService.updateDetail(detail).subscribe(
      (response:DetailDto)=>{
        this.getCustomerDetails();
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      });
  }

  onDeleteCustomerDetail(deleteCustomerDetail: DetailDto) {
    this._detailService.deleteDetail(deleteCustomerDetail.id).subscribe(
      (response:void)=>{
        this.getCustomerDetails();
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      });
  }
}
