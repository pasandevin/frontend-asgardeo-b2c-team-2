import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  @Input() myData: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnItit(): void {}

  bgColor = 'gray';

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  changeColor(): void {
    this.bgColor = 'yellowgreen';
  }
}
