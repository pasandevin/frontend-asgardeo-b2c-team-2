import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/auth.service';
import { Device } from '../../device';
import { DeviceService } from '../../device.service';
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public isAuthenticated$: Observable<boolean>;
  public isDoneLoading$: Observable<boolean>;
  public canActivateProtectedRoutes$: Observable<boolean>;
  public devices: Device[] = [];
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private authService: AuthService,
    private deviceService: DeviceService,

  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isDoneLoading$ = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes$ = this.authService.canActivateProtectedRoutes$;
  }


  ngOnInit(): void {
    this.getProducts();
    this.getDevices();
  }
  public getDevices():void{
    this.isAuthenticated$.subscribe(data =>{
      if(data==true){
        this.deviceService.getDevices().subscribe(
          (response: Device[]) => {
            this.devices = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        )
      }
    })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onRemoveFromCartIcon(product: Product): void {
    this.cartService.removeFromCartIcon({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
