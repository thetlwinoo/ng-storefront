import { TestBed } from '@angular/core/testing';

import { ProductWishlistService } from './product-wishlist.service';

describe('ProductWishlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductWishlistService = TestBed.get(ProductWishlistService);
    expect(service).toBeTruthy();
  });
});
