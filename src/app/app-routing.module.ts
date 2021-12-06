import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import { AuthGuard } from './_helpers/auth.guard'
import { RegisterComponent } from './register/register.component'
import { ProductsComponent } from './products/products.component'
import { CustomerDetailsComponent } from './customer-details/customer-details.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent,},
  { path: 'about', component: AboutComponent,},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductsComponent},
  {path:'account/details',component:CustomerDetailsComponent},
  {path:'cart',component:ShoppingCartComponent},

  // otherwise redirect to home //canActivate:[AuthGuard]
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
