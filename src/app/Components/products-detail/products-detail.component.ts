import { Component, OnInit } from '@angular/core';
import { Products } from '../../Models/products';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppConst} from '../../Constants/app-const';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  private productsId: number;
	private products: Products = new Products();
	private serverPath = AppConst.serverPath;
	private numberList: number[] = [1,2,3,4,5,6,7,8,9];
	private qty: number;

	private addProductsSuccess: boolean = false;
	private notEnoughStock:boolean = false;

  constructor(
    private cartService:CartService,
    private productsService: ProductsService,
		private router:Router,
		private http:HttpClient,
		private route:ActivatedRoute
  ) { }

  onAddToCart() {
    this.cartService.addItem(this.productsId, this.qty).subscribe(
      (res:any) => {
        console.log(res.text());
        this.addProductsSuccess=true;
      },
      err => {
        console.log(err.text());
        this.notEnoughStock=true;
      }
    );
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
  		this.productsId = Number.parseInt(params['id']);
  	});

  	this.productsService.getProducts(this.productsId).subscribe(
  		(res:any) => {
  			this.products=res.json();
  		},
  		error => {
  			console.log(error);
  		}
  	);

  	this.qty = 1;
  }

}
