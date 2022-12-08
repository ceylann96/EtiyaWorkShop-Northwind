import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  dateNow: Date = new Date();
  @Input() product!: Product;
  @Output() onAddToCartClick = new EventEmitter<Product>();

  btnPrimary:string= 'btn btn-primary'
  btnSecondary:string= 'btn btn-secondary'
  btnDark:string= 'btn btn-dark'

  

  
  
 
  @Input() pageSize!: number;
  @Output() changePageSize = new EventEmitter<number>();

  changePageS() {
    // Parent componenti uyar, event emitter'i tetikle ve emitle.
  this.changePageSize.emit(this.pageSize);
  }
}
