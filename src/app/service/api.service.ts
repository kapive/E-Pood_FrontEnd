import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenStoreService} from "./app.token.store.service";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {
  }

  getHeaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.tokenStore.getToken());
    return  headers
  }

  singIn(username: string, password: string) {
    const params = new HttpParams().set("username", username).set("password", password)
    return this.http.post("http://localhost:8080/login", {}, {params: params, observe: 'response'})
  }
}
