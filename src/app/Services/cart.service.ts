import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../Constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addItem(id:number, qty: number) {
  	let url = AppConst.serverPath+"/cart/add";
  	let cartItemInfo = {
  		"productsId" : id,
  		"qty" : qty
  	}
  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, cartItemInfo, {headers: tokenHeader});
  }

  getCartItemList() {
  	let url = AppConst.serverPath+"/cart/getCartItemList";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});
  }

  getShoppingCart() {
  	let url = AppConst.serverPath+"/cart/getShoppingCart";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});
  }

  updateCartItem(cartItemId: number, qty: number) {
  	let url = AppConst.serverPath+"/cart/updateCartItem";
  	let cartItemInfo = {
  		"cartItemId" : cartItemId,
  		"qty" : qty
  	}
  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, cartItemInfo, {headers: tokenHeader});
  }

  removeCartItem(id: number) {
  	let url = AppConst.serverPath+"/cart/removeItem";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, id, {headers: tokenHeader});
  }

}
