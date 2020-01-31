import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../Constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsList() {
  	let url = AppConst.serverPath+"/products/productsList";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});
  }

  getProducts(id:number) {
  	let url = AppConst.serverPath+"/products/"+id;

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.get(url, {headers: tokenHeader});
  }

  searchProducts(keyword:string) {
  	let url = AppConst.serverPath+"/products/searchProducts";

  	let tokenHeader = new HttpHeaders({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem("xAuthToken")
  	});
  	return this.http.post(url, keyword, {headers: tokenHeader});
  }
}
