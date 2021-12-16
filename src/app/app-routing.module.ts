import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import { ProductsComponent } from './products/products.component'
import { CustomerDetailsComponent } from './customer-details/customer-details.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { ContactComponent } from "./contact/contact.component"
import { AuthGuard } from './auth/guards/auth.guard'
import { CheckoutComponent } from "./checkout/checkout.component"
import { AdminPanelComponent } from './admin-panel/admin-panel.component'
import { AddEditComponent } from './admin-panel/add-edit/add-edit.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'account/details', component: CustomerDetailsComponent,canActivate:[AuthGuard]},
  { path: 'cart', component: ShoppingCartComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/add', component: AddEditComponent },
  { path: 'admin/edit/:id', component: AddEditComponent },
 { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(v => v.AuthModule) },

  { path: '**', redirectTo: 'home' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
