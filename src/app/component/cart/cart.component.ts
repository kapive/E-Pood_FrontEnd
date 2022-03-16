import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {CartProduct} from "../../service/model/cart.product";
import {CartStoreService} from "../../service/cart/app.cart.store.service";
import {Router} from "@angular/router";
import {TokenStoreService} from "../../service/app.token.store.service";
import {CartApiService} from "../../service/cart/app.cart.service";
import {OrderApiService} from "../../service/order/app.order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartProducts!: CartProduct[];

  constructor(private cartApi: CartApiService,
              private orderApi: OrderApiService,
              private cartStore: CartStoreService,
              private router: Router,
              private tokenStore: TokenStoreService) { }

  ngOnInit(): void {
    if (this.tokenStore.getToken() == null) {
      this.router.navigate(['/']);
    }

    let localCartId = this.cartStore.getCartNumber();

    if (localCartId !== null) {
      this.cartApi.getCartById(localCartId)
        .subscribe(res => {
          this.cartProducts = res;
        })
    }
  }

  async addProductQuantityPerOne(productId:number) {
    let localCartId = this.cartStore.getCartNumber();

    if (localCartId !== null) {
      await this.cartApi.addProductToCart({"cartId": localCartId, "productId": productId}).toPromise().then();
      this.cartApi.getCartById(localCartId)
        .subscribe(res => {
          this.cartProducts = res;
        })
    }
  }

  async removeProductQuantityPerOne(productId:number) {
    let localCartId = this.cartStore.getCartNumber();

    if (localCartId !== null) {
      await this.cartApi.removeProductFromCart({"cartId": localCartId, "productId": productId}).toPromise().then();

      this.cartApi.getCartById(localCartId)
        .subscribe(res => {
          this.cartProducts = res;
        })
    }
  }

  async deleteProductFromCart(productId:number) {
    let localCartId = this.cartStore.getCartNumber();

    if (localCartId !== null) {

      await this.cartApi.deleteProductFromCart({"cartId": localCartId, "productId": productId}).toPromise().then();

      this.cartApi.getCartById(localCartId)
        .subscribe(res => {
          this.cartProducts = res;
        })
    }
  }

  async checkOut() {
    let localCartId = this.cartStore.getCartNumber();

    if (localCartId !== null) {
      await this.orderApi.checkOutCart(localCartId).toPromise().then();
      this.cartStore.setCartNumber(null);
      this.cartProducts = []
    }
  }

  countTotalCost() {
    let totalCount = 0;

    if (this.cartProducts !== undefined) {
      for (let cart of this.cartProducts) {
        totalCount += cart.quantity * cart.product.productCost
      }
    }
    return (Math.round(totalCount * 100) / 100).toFixed(2);
  }
}
