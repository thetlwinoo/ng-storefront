import { Component, OnInit } from '@angular/core';
import { Product, CartItem } from '@box/models';
import { ProductsService, CartService } from '@box/services';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public shoppingCartItems: CartItem[] = [];

  constructor(private productsService: ProductsService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  // Increase Product Quantity
  public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product, quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product, quantity);
  }

  // Get Total
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  // Remove cart items
  public removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

}
