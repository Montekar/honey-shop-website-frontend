import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import { AuthGuard } from './_helpers/auth.guard'
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  { path: 'about', component: AboutComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
