import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppConst } from '../../Constants/app-const';
import { Products } from '../../Models/products';
import { CartService } from '../../Services/cart.service';
import { ShoppingCart } from '../../Models/shopping-cart';
import { CartItem } from '../../Models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private serverPath = AppConst.serverPath;
	private selectedProducts: Products;
	private cartItemList: CartItem[] = [];
	private cartItemNumber: number;
	private shoppingCart: ShoppingCart = new ShoppingCart();
	private cartItemUpdated: boolean;
	private emptyCart: boolean;
	private notEnoughStock: boolean;

  constructor(
    private router:Router,
  	private cartService: CartService
  ) { }

  onSelect(products:Products) {
  	this.selectedProducts = products;
  	this.router.navigate(['/ProductsDetail', this.selectedProducts.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
  	this.cartService.removeCartItem(cartItem.id).subscribe(
  		(res:any) => {
  			console.log(res.text());
  			this.getCartItemList();
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  onUpdateCartItem(cartItem: CartItem) {
  	this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
  		(res:any) => {
  			console.log(res.text());
  			this.cartItemUpdated=true;
  			this.getShoppingCart();
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  getCartItemList()  {
  	this.cartService.getCartItemList().subscribe(
  		(res:any) => {
  			this.cartItemList=res.json();
  			this.cartItemNumber = this.cartItemList.length;
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  getShoppingCart() {
  	this.cartService.getShoppingCart().subscribe(
  		(res:any) => {
  			console.log(res.json());
  			this.shoppingCart=res.json();
  		},
  		error => {
  			console.log(error.text());
  		}
  	)
  }

  onCheckout() {
  	if(this.cartItemNumber==0) {
  		this.emptyCart=true;
  	} else {
  		for (let item of this.cartItemList) {
  			if (item.qty > item.products.inStockNumber) {
  				console.log("not enough stock on some item");
  				this.notEnoughStock=true;
  				return;
  			}
  		}

			// this.router.navigate('[/order]');
  	}
  }

  ngOnInit() {
    this.getCartItemList();
  	this.getShoppingCart();
  }

}
