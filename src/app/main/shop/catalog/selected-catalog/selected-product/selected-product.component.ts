import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
// import * as fromStockItem from '@store/stock-items/reducers';
// import * as StockItemActions from '@store/stock-items/actions/stock-item.actions';

// import { PhotoService } from '@box/services/photo.service';

@Component({
  selector: 'selected-product',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-product.component.html',
  styleUrls: ['./selected-product.component.scss']
})
export class SelectedProductComponent {
  // product$: Observable<StockItem>;
  images$: Observable<any>;
  constructor(
    //   private store: Store<fromStockItem.State>,
    // private photoService: PhotoService
  ) {
    // this.product$ = store.pipe(select(fromStockItem.getSelectedStockItem)) as Observable<StockItem>;

    // store.pipe(select(fromStockItem.getSelectedId)).subscribe(id=> {
    //   this.images$ = this.photoService.images$(id);
    // })
  }

}
