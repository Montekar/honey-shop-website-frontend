import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { EmailService } from "../_services/email.service"
import { Email } from "../_models/email"
import { HttpErrorResponse } from "@angular/common/http"


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private emailService:EmailService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onSubmit() {

    if (this.contactForm.invalid) {
      return;
    }

    var form = this.contactForm.value;
    var email:Email = {
      receiverEmail:"honeyshopcontactform@gmail.com",
      body:form.message,
      subject:form.name+" | "+form.email+" has filled the form!"
    }

    this.emailService.send(email).subscribe(()=>{
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
