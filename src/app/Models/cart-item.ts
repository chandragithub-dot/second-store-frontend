import {Products} from './products';
import {ShoppingCart} from './shopping-cart';

export class CartItem {
    public id: number;
	public qty: number;
	public subtotal: number;
	public products: Products;
	public shoppingCart: ShoppingCart;
	public toUpdate:boolean;
}
