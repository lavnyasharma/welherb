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
import { AuthGuard } from '../auth.guard';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExpertComponent } from './components/expert/expert.component';
import { IngredientsPageComponent } from './modules/ingredients-page/ingredients-page.component';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import { BlogOpenComponent } from './modules/blog-open/blog-open.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { ShippingandRefundPolicyComponent } from './components/shippingand-refund-policy/shippingand-refund-policy.component';
// Import Auth Guard

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'discover', component: AboutComponent },
  {   path: 'shop/:id', component: ShopComponent },  
  { path: 'shopall', component: ShopallComponent },
 
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },  
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'blogs', component: ExpertComponent },
  { path: 'blogs-open', component: BlogOpenComponent },
   { path: 'ingredients', component: IngredientsPageComponent },
    { path: 'expert-help', component: ContactUsComponent },
    { path: 'privacy-policy', component: PrivacypolicyComponent },
        { path: 'ShippingandRefundPolicy', component: ShippingandRefundPolicyComponent },
  
  { path: '**', redirectTo: '', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
