import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input() sendCartClearMessage = new EventEmitter<boolean>();

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(private cartService: CartService,private authService: AuthService) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  login() : void
{
  this.authService.login();
}
logout() : void
{
  this.authService.logout();
}
  onCartClearMessage(): void {
    this.sendCartClearMessage.emit(true);
  }
}
