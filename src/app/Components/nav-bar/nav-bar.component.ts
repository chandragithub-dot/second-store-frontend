import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router, NavigationExtras } from '@angular/router';
import {ProductsService} from '../../Services/products.service';
import {Products} from '../../Models/products';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn=false; //login demo
  private keyword: string;
  private productsList:Products[] =[];

  constructor(
	private loginService: LoginService,
    private router: Router,
    private productsService: ProductsService
  ) { }

  logout() {
  	this.loginService.logout().subscribe(
  		res => {
  			location.reload();
  		},
  		err => {
  			console.log(err);
  		}
  	);
  }

  onSearchByTitle() {
    this.productsService.searchProducts(this.keyword).subscribe(
      (res:any)=> {
        this.productsList = res.json();
        console.log(this.productsList);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "productsList" : JSON.stringify(this.productsList)
          }
        };

        this.router.navigate(['/productsList'], navigationExtras);
      },
      error=>{
        console.log(error);
      }
      );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
  		res => {
  			this.loggedIn = true;
  		},
  		err => {
  			this.loggedIn =false;
  		}
  	);
  }

}
