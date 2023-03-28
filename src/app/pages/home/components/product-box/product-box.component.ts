import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCartIcon = new EventEmitter();

  @Input() myData: string | undefined;

  isClicked: boolean = false;

  constructor(public cartService: CartService) {
    // this.isItemAvailableInCard = this.cartService.isItemAvailableInCard(this);
  }

  ngOnItit(): void {}

  bgColor = 'gray';

  isItemAvailableInCard: boolean | undefined;

  onCartClicked(): void {
    if (!this.isClicked) {
      this.addToCart.emit(this.product);
      this.isClicked = true;
      this.bgColor = 'yellowgreen';
    } else {
      this.removeFromCartIcon.emit(this.product);
      this.isClicked = false;
      this.bgColor = 'gray';
    }
  }

  changeCardBG($event: any): void {
    console.log('helloo');
    console.log($event);
  }

  // onAddToCart(): void {
  //   console.log('add');

  //   if (!this.isClicked) {
  //     this.addToCart.emit(this.product);
  //     this.isClicked = true;
  //   }
  // }

  // onRemoveFromCartIcon(): void {
  //   console.log('remove');

  //   if (this.isClicked) {
  //     this.removeFromCartSmall.emit(this.product);
  //     this.isClicked = false;
  //   }
  // }

  // changeColor(): void {
  //   this.bgColor = 'yellowgreen';
  // }
}
