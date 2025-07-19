import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

// PrimeNG Modules
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

// import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { ToastrModule } from 'ngx-toastr';


// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';
// import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';

import { AdminModule } from './modules/admin/admin.module';

// Components
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { ShopComponent } from './modules/shop/shop.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { AboutComponent } from './modules/about/about.component';
import { ProductComponent } from './modules/product/product.component';
import { ParallaxComponent } from './components/parallax/parallax.component';
import { LearnComponent } from './components/learn/learn.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { ContactDoctorComponent } from './components/contact-doctor/contact-doctor.component';
import { FormComponent } from './components/form/form.component';
import { StripsComponent } from './components/strips/strips.component';
import { IngredientsDescComponent } from './components/ingredients-desc/ingredients-desc.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ShopallComponent } from './modules/shopall/shopall.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSliderModule } from 'ng-zorro-antd/slider';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ProdDescComponent } from './components/prod-desc/prod-desc.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartService } from '../services/cart.service';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ExpertComponent } from './components/expert/expert.component';
import { FaqComponent } from './components/faq/faq.component';
import { DietryAdviceComponent } from './components/dietry-advice/dietry-advice.component';
import { IngredientsPageComponent } from './modules/ingredients-page/ingredients-page.component';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    
    ShopComponent,
    TestimonialComponent,
    AboutComponent,
    ProductComponent,
    ParallaxComponent,
    LearnComponent,
    IngredientsComponent,
    ContactDoctorComponent,
    FormComponent,
    StripsComponent,
    IngredientsDescComponent,
    ShopallComponent,

    ProfileComponent,
     LoginComponent,
     SignupComponent,
     CheckoutComponent,
     ProdDescComponent,
     BlogComponent,
     ReviewsComponent,
     ExpertComponent,
     FaqComponent,
     DietryAdviceComponent,
     IngredientsPageComponent,
     ContactUsComponent,

  ],
  imports: [
    BrowserModule,
    NzSelectModule,
    NzRateModule,
    NzPaginationModule,
    NzDividerModule,
    NzCardModule,
    BrowserModule,
    MenubarModule,
    FontAwesomeModule,
    NzSliderModule,
    HttpClientModule,
    NzIconModule,
    NzInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    ButtonModule,
    NzMenuModule,
    RippleModule,
    CardModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Required for animations
    BrowserAnimationsModule, // Make sure this is added
    ToastrModule.forRoot({
      timeOut: 3000, // Toast disappears after 3 seconds
      positionClass: 'toast-top-right', // Position of toast
      preventDuplicates: true, // Avoid duplicate toasts
    }),
    
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CarouselModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    ConfirmDialogModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    GalleriaModule,
    InputTextModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    PaginatorModule,
    PanelModule,
    SidebarModule,
    TableModule,
    ToastModule,
    AuthModule,
    ToastrModule,

    CartModule,
    OrderModule,
    UserModule,
    AdminModule,
  ],
  exports: [
    // Export any components or modules you want to use in other modules
    BadgeModule,
    AvatarModule,
    AvatarGroupModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CarouselModule,
    CheckboxModule,
    ChipsModule,
    ColorPickerModule,
    ConfirmDialogModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    GalleriaModule,
    InputTextModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    PaginatorModule,
    PanelModule,
    SidebarModule,
    TableModule,
    ToastModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent],
})
export class AppModule { }
