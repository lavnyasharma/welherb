import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { ShopComponent } from '../app/modules/shop/shop.component';
import { AboutComponent } from '../app/modules/about/about.component';
import { ShopallComponent } from './modules/shopall/shopall.component';
import { CartComponent } from './modules/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'discover', component: AboutComponent },
  { path: 'shop', component: ShopComponent },  
  { path: 'shopall', component: ShopallComponent },  
  { path: 'cart', component: CartComponent },  
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
