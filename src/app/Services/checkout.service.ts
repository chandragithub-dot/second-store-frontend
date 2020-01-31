import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppConst} from '../Constants/app-const';
import {ShippingAddress} from '../Models/shipping-address';
import {BillingAddress} from '../Models/billing-address';
import {Payment} from '../Models/payment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  checkout(
  	shippingAddress: ShippingAddress,
  	billingAddress: BillingAddress,
  	payment:Payment,
  	shippingMethod:string
  	){
		let url = AppConst.serverPath+"/checkout/checkout";
		let order ={
			"shippingAddress" : shippingAddress,
			"billingAddress" : billingAddress,
			"payment" : payment,
			"shippingMethod" : shippingMethod
		}

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, order, {headers: tokenHeader});
  }

  getUserOrder() {
  	let url = AppConst.serverPath+"/checkout/getUserOrder";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});

  }
}
