import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { ShopComponent } from '../app/modules/shop/shop.component';
import { AboutComponent } from '../app/modules/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route for home page
  { path: 'about', component: AboutComponent },  // Route for shop page
  { path: '**', redirectTo: '', pathMatch: 'full' },  // Wildcard route, redirects to home if route is not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
