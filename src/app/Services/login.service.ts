import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from '../Constants/app-const';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serverPath: string = AppConst.serverPath;
  

  constructor(private http:HttpClient, private router:Router) { }

  sendCredential(username: string, password: string){
    let url = this.serverPath+'/token';
  	let encodedCredentials = btoa(username+":"+password);
  	let basicHeader = "Basic "+encodedCredentials;
  	let headers = new HttpHeaders({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

  	return this.http.get(url, {headers: headers});
  }

  checkSession() {
  	let url = this.serverPath+'/checkSession';
  	let headers = new HttpHeaders({
  		'x-auth-token' : localStorage.getItem('xAuthToken')
  	});

  	return this.http.get(url, {headers: headers});
  }

  logout() {
  	let url = this.serverPath+'/user/logout';
  	let headers = new HttpHeaders({
  		'x-auth-token' : localStorage.getItem('xAuthToken')
  	});

  	return this.http.post(url, '', {headers: headers});
  }

}
