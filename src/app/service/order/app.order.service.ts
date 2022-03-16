import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenStoreService} from "../app.token.store.service";
@Injectable({
  providedIn: "root"
})
export class OrderApiService {
  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {
  }

  getHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.tokenStore.getToken());
    return  headers
  }

  checkOutCart(cartId: number) {
    const params = new HttpParams().set("cartId", cartId)
    return this.http.post("http://localhost:8080/api/v1/order/new", {}, {params: params, headers: this.getHeaders()})
  }
}
