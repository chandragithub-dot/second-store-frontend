import { Component, OnInit } from '@angular/core';
import { Products } from '../../Models/products';
import { ProductsService } from '../../Services/products.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppConst} from '../../Constants/app-const';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public filterQuery = "";
	public rowsOnPage = 5;

	private selectedProducts: Products;
	private productsList: Products[];
	private serverPath = AppConst.serverPath;

  constructor(
    private productsService:ProductsService,
		private router:Router,
		private http:HttpClient,
		private route:ActivatedRoute
  ) { }

  onSelect(products: Products) {
		this.selectedProducts = products;
		this.router.navigate(['/ProductsDetail', this.selectedProducts.id]);
	}


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
			if(params['productsList']) {
				console.log("filtered book list");
				this.productsList = JSON.parse(params['productsList']);
			} else {
				this.productsService.getProductsList().subscribe(
					(res:any) => {
						console.log(res.json());
						this.productsList = res.json();
					},
					err => {
						console.log(err);
					}
					);
			}
		});

  }
  
  }

