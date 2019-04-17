import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@box/models/product';
import { CartItem } from '@box/models/cart-item';
import { ProductsService } from '@box/services/products.service';
import { WishlistService } from '@box/services/wishlist.service';
import { CartService } from '@box/services/cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'product-box-hover',
  templateUrl: './product-box-hover.component.html',
  styleUrls: ['./product-box-hover.component.scss']
})
export class ProductBoxHoverComponent implements OnInit {
  
  @Input() product : Product;

  constructor(private router: Router, public productsService: ProductsService, 
    private wishlistService: WishlistService, private cartService: CartService) { 
  }

  ngOnInit() {
  }

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1) {
    this.cartService.addToCart(product,quantity);
  }

  // Add to compare
  public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }

}
