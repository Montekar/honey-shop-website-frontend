import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OwlModule } from 'ngx-owl-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LoginDropdownComponent } from './header/login-dropdown/login-dropdown.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './auth/register/register.component'
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ContactComponent } from "./contact/contact.component";
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AddEditComponent } from './admin-panel/add-edit/add-edit.component'
//import { JwtInterceptor } from './_helpers/jwt.interceptor'
//import { ErrorInterceptor } from './_helpers/error.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginDropdownComponent,
    FooterComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    RegisterComponent,
    CustomerDetailsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ContactComponent,
    AdminPanelComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OwlModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule {}
