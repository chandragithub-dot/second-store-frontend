import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule}  from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DataTablesModule } from "angular-datatables";
import { DataFilterPipe } from './Components/products-list/data-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { MyAccountComponent } from './Components/my-account/my-account.component';

import { LoginService } from './Services/login.service';
import { UserService } from './Services/user.service';
import { PaymentService } from './Services/payment.service';
import { ShippingService } from './Services/shipping.service';
import { ProductsService } from './Services/products.service';
import { CartService } from './Services/cart.service';
import { OrderService } from './Services/order.service';
import { CheckoutService } from './Services/checkout.service';


import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductsDetailComponent } from './Components/products-detail/products-detail.component';
import { OrderComponent } from './Components/order/order.component';
import { from } from 'rxjs';
import { OrderSummaryComponent } from './Components/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MyAccountComponent,
    ShoppingCartComponent,
    MyProfileComponent,
    ProductsListComponent,
    DataFilterPipe,
    ProductsDetailComponent,
    OrderComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    UserService,
    PaymentService,
    ShippingService,
    ProductsService,
    CartService,
    OrderService,
    CheckoutService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
