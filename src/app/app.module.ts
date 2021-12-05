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
import { AuthGuard } from './_helpers/auth.guard';
import { RegisterComponent } from './register/register.component'
import { ProductsComponent } from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
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
    ShoppingCartComponent
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
    AuthGuard,
  //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
