import { Component, OnInit } from '@angular/core';
import {Product} from "../../service/model/product";
import {CartStoreService} from "../../service/cart/app.cart.store.service";
import {Router} from "@angular/router";
import {TokenStoreService} from "../../service/app.token.store.service";
import {ProductApiService} from "../../service/product/app.product.service";
import {CartApiService} from "../../service/cart/app.cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList! : Product[]

  constructor(private productApi: ProductApiService,
              private cartApi: CartApiService,
              private cartStore: CartStoreService,
              private router: Router,
              private tokenStore: TokenStoreService) { }

  ngOnInit(): void {
    if (this.tokenStore.getToken() == null) {
      this.router.navigate(['/']);
    }

    this.productApi.getProducts()
      .subscribe(res => {
        this.productList = res;
      })
  }

  async onAddToCartClick(product: Product) {
    let cartId;
    let localCartId = this.cartStore.getCartNumber();

    if (localCartId == null) {
      await this.cartApi.getNewCartId().toPromise().then(res => {
        cartId = res
      });
    } else {
      cartId = localCartId;
    }

    // @ts-ignore
    this.cartStore.setCartNumber(cartId)

    await this.cartApi.addProductToCart({
      "cartId": cartId,
      "productId": product.productId
    }).toPromise().then()
  }
}
