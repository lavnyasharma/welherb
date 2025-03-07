import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { ShopComponent } from '../app/modules/shop/shop.component';
import { AboutComponent } from '../app/modules/about/about.component';
import { ShopallComponent } from './modules/shopall/shopall.component';
import { CartComponent } from './modules/cart/cart.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'discover', component: AboutComponent },
  { path: 'shop', component: ShopComponent },  
  { path: 'shopall', component: ShopallComponent },  
  { path: 'cart', component: CartComponent },  
  { path: 'profile', component: ProfileComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
