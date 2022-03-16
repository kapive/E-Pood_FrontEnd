import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CartProduct} from "../model/cart.product";
import {TokenStoreService} from "../app.token.store.service";
@Injectable({
  providedIn: "root"
})
export class CartApiService {
  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {
  }

  getHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.tokenStore.getToken());
    return  headers
  }

  addProductToCart(cartRequest: object) {
    return this.http.post("http://localhost:8080/api/v1/cart/add", cartRequest, {headers: this.getHeaders()})
  }

  removeProductFromCart(cartRequest: object) {
    return this.http.post("http://localhost:8080/api/v1/cart/remove", cartRequest, {headers: this.getHeaders()})
  }

  getNewCartId() {
    return this.http.get<number>("http://localhost:8080/api/v1/cart/new", {headers: this.getHeaders()})
  }

  getCartById(cartId: number) {
    const params = new HttpParams().set("cartId", cartId)
    return this.http.get<CartProduct[]>("http://localhost:8080/api/v1/cart", {params: params, headers: this.getHeaders()})
  }

  deleteProductFromCart(cartRequest: object) {
    return this.http.delete("http://localhost:8080/api/v1/cart/delete", {body: cartRequest, headers: this.getHeaders()})
  }
}
