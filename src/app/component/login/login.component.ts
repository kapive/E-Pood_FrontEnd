import {Component} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {FormBuilder} from "@angular/forms";
import {TokenStoreService} from "../../service/app.token.store.service";
import {Router, Routes} from "@angular/router";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent{
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              public tokenStore: TokenStoreService,
              private router: Router) {}

  async onSubmit(): Promise<void> {
    await this.api
      .singIn(this.loginForm.value.username, this.loginForm.value.password).toPromise().then(res => {
        this.tokenStore.setToken(res?.headers.get("Authorization"))
    });
    if (this.tokenStore.getToken() !== null) {
      this.router.navigate(['/products'])
    }
  }
}
