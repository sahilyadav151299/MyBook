import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { PackageDataComponent } from './components/package-data/package-data.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';

const routes: Routes = [

  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'orders', component: OrdersComponent },
  { path: 'packages', component: PackageDataComponent },
  { path: 'cart', component: AddToCartComponent},
  { path: 'book-shelf', component: BookShelfComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents ={LoginComponent,SignUpComponent}