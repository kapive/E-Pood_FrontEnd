import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStoreService {

  private _tokenSource: any = null

  constructor() {}

  getToken(): string {
    return this._tokenSource;
  }

  setToken(token: any): void {
    this._tokenSource = token;
  }
}
