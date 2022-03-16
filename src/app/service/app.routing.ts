import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../component/login/login.component";
import {ProductComponent} from "../component/product/product.component";
import {CartComponent} from "../component/cart/cart.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'products', component: ProductComponent },
  { path: 'cart', component: CartComponent },

  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
