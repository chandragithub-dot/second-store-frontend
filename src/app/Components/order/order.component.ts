import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../Constants/app-const';
import {Products} from '../../Models/products';
import {Router, NavigationExtras} from "@angular/router";
import {CartService} from '../../Services/cart.service';
import {ShippingService} from '../../Services/shipping.service';
import {PaymentService} from '../../Services/payment.service';
import {CheckoutService} from '../../Services/checkout.service';
import {CartItem} from '../../Models/cart-item';
import {ShoppingCart} from '../../Models/shopping-cart';
import {ShippingAddress} from '../../Models/shipping-address';
import {BillingAddress} from '../../Models/billing-address';
import {UserPayment} from '../../Models/user-payment';
import {UserBilling} from '../../Models/user-billing';
import {UserShipping} from '../../Models/user-shipping';
import {Payment} from '../../Models/payment';
import {Order} from '../../Models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private selectedProducts: Products;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated:boolean;
  private shippingAddress:ShippingAddress=new ShippingAddress();
  private billingAddress:BillingAddress = new BillingAddress();
  private userPayment:UserPayment = new UserPayment();
  private userShipping:UserShipping = new UserShipping();
  private userBilling: UserBilling = new UserBilling();
  private userShippingList: UserShipping[] = [];
  private userPaymentList: UserPayment[] = [];
  private payment: Payment = new Payment();
  private selectedTab: number;
  private emptyShippingList: boolean = true;
  private emptyPaymentList: boolean = true;
  private stateList: string[] = [];
  private shippingMethod:string;
  private order:Order = new Order();

  constructor(
    private router:Router, 
  	private cartService: CartService, 
  	private shippingService: ShippingService,
  	private paymentService: PaymentService,
  	private checkoutService: CheckoutService
  ) { }

  onSelect(products:Products) {
    this.selectedProducts = products;
    this.router.navigate(['/bookDetail', this.selectedProducts.id]);
  }

  selectedChange(val :number ){
    this.selectedTab=val;
  }

  goToPayment() {
  	this.selectedTab=1;
  }

  goToReview() {
  	this.selectedTab=2;
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
      (res:any)=>{
        this.cartItemList = res.json();
        this.cartItemNumber = this.cartItemList.length;
      },
      error=>{
        console.log(error.text());
      }
      );
  }

  setShippingAddress(userShipping: UserShipping) {
  	this.shippingAddress.shippingAddressName = userShipping.userShippingName;
  	this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
  	this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
  	this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
  	this.shippingAddress.shippingAddressState = userShipping.userShippingState;
  	this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
  	this.shippingAddress.shippingAddressZipcode = userShipping.userShippingZipcode;
  }

  setPaymentMethod(userPayment: UserPayment) {
  	this.payment.type = userPayment.type;
  	this.payment.cardNumber = userPayment.cardNumber;
  	this.payment.expiryMonth = userPayment.expiryMonth;
  	this.payment.expiryYear = userPayment.expiryYear;
  	this.payment.cvc = userPayment.cvc;
  	this.payment.holderName = userPayment.holderName;
  	this.payment.defaultPayment = userPayment.defaultPayment;
  	this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
  	this.billingAddress.billingAddressStreet1 = userPayment.userBilling.userBillingStreet1;
  	this.billingAddress.billingAddressStreet2 = userPayment.userBilling.userBillingStreet2;
  	this.billingAddress.billingAddressCity = userPayment.userBilling.userBillingCity;
  	this.billingAddress.billingAddressState = userPayment.userBilling.userBillingState;
  	this.billingAddress.billingAddressCountry = userPayment.userBilling.userBillingCountry;
  	this.billingAddress.billingAddressZipcode = userPayment.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked:boolean){
  	console.log("same as shipping")

  	if(checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
      this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
      this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
      this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
      this.billingAddress.billingAddressState = this.shippingAddress.shippingAddressState;
      this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
      this.billingAddress.billingAddressZipcode = this.shippingAddress.shippingAddressZipcode;
    } else {
      this.billingAddress.billingAddressName = "";
      this.billingAddress.billingAddressStreet1 = "";
      this.billingAddress.billingAddressStreet2 = "";
      this.billingAddress.billingAddressCity = "";
      this.billingAddress.billingAddressState = "";
      this.billingAddress.billingAddressCountry = "";
      this.billingAddress.billingAddressZipcode = "";
    }
  }

  onSubmit(){
  	this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod
      ).subscribe(
      (res:any)=>{
        this.order=res.json();
        console.log(this.order);

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "order": JSON.stringify(this.order)
            }
        };

        this.router.navigate(['/orderSummary'], navigationExtras);
      },
      error=>{
        console.log(error.text());
      }
      );
    }

  ngOnInit() {
    this.getCartItemList();


      this.cartService.getShoppingCart().subscribe(
        (res:any)=>{
          console.log(res.json());
          this.shoppingCart=res.json();
        },
        error=>{
          console.log(error.text());
        }
        );

      this.shippingService.getUserShippingList().subscribe(
        (res:any)=>{
          console.log(res.json());
          this.userShippingList=res.json();
          if(this.userShippingList.length) {
            this.emptyShippingList = false;

            for (let userShipping of this.userShippingList) {
              if(userShipping.userShippingDefault) {
                this.setShippingAddress(userShipping);
                return;
              }
            }
          }
        },
        error=>{
          console.log(error.text());
        }
        );

      this.paymentService.getUserPaymentList().subscribe(
        (res:any)=>{
          console.log(res.json());
          this.userPaymentList=res.json();
          this.emptyPaymentList = false;

          if(this.userPaymentList.length) {
            this.emptyPaymentList = false;

            for (let userPayment of this.userPaymentList) {
              if(userPayment.defaultPayment) {
                this.setPaymentMethod(userPayment);
                return;
              }
            }
          }
        },
        error=>{
          console.log(error.text());
        }
        );

      for (let s in AppConst.indiaStates) {
        this.stateList.push(s);
      }

      this.payment.type="";
      this.payment.expiryMonth="";
      this.payment.expiryYear="";
      this.billingAddress.billingAddressState="";
      this.shippingAddress.shippingAddressState="";
      this.shippingMethod="groundShipping";
    }
  }


