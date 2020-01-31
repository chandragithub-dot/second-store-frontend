import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MyAccountComponent } from './Components/my-account/my-account.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductsDetailComponent } from './Components/products-detail/products-detail.component';
import {OrderComponent} from './Components/order/order.component';
import {OrderSummaryComponent} from './Components/order-summary/order-summary.component';


const routes: Routes = [
  {
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'myAccount',
		component: MyAccountComponent
	},
	{
		path: 'shoppingCart',
		component: ShoppingCartComponent
	},
	{
		path: 'myProfile',
		component: MyProfileComponent
	},
	{
		path: 'productsList',
		component: ProductsListComponent
	},
	{
		path: 'productsDetail/:id',
		component: ProductsDetailComponent
	},
	{
		path: 'checkout',
		component: OrderComponent
	},
	{
		path: 'orderSummary',
		component: OrderSummaryComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
