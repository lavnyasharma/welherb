import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    MenubarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    ButtonModule,
    RippleModule,
    CardModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
