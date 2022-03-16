import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartStoreService {

  private _cartSource: any = null

  constructor() {}

  getCartNumber(): number {
    return this._cartSource;
  }

  setCartNumber(cart: any): void {
    this._cartSource = cart;
  }
}
