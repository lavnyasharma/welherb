import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { ShopComponent } from '../app/modules/shop/shop.component';
import { AboutComponent } from '../app/modules/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'discover', component: AboutComponent },  // Route for shop page
  { path: '**', redirectTo: '', pathMatch: 'full' },  
  {path: 'shop', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
