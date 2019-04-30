import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@box/models';
import { ProductsService } from '@box/services/products.service';
import { ProductWishlistService } from './product-wishlist.service';
import { CartService } from '@box/services/cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-wishlist',
  templateUrl: './product-wishlist.component.html',
  styleUrls: ['./product-wishlist.component.scss']
})
export class ProductWishlistComponent implements OnInit {

  public product: Observable<Product[]> = of([]);
  public wishlistItems: Product[] = [];

  constructor(private router: Router, private wishlistService: ProductWishlistService,
    private productsService: ProductsService, private cartService: CartService) {
    this.product = this.wishlistService.getProducts();
    this.product.subscribe(products => this.wishlistItems = products);
  }

  ngOnInit() { }

  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {
    if (quantity > 0)
      this.cartService.addToCart(product, quantity);
      
    this.wishlistService.removeFromWishlist(product);
  }

  // Remove from wishlist
  public removeItem(product: Product) {
    this.wishlistService.removeFromWishlist(product);
  }

}
