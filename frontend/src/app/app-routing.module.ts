import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { PackageDataComponent } from './components/package-data/package-data.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


let token = localStorage.getItem('userToken')
let auth = false
let role = 0
let routes : Routes

if(token){
  auth = JSON.parse(token).auth
  role = JSON.parse(token).role
}

if(auth && role === 0){
  routes = [
    { path: '', component: OrdersComponent, pathMatch : 'full' },
    { path: 'packages', component: PackageDataComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'cart', component: AddToCartComponent},
    { path: 'book-shelf', component: BookShelfComponent},
    { path: 'user-profile', component: UserProfileComponent},
    { path: '**', component: PageNotFoundComponent} 
  ] 
}else{
  routes = [
    { path: '', component: LoginComponent, pathMatch : 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    { path: '**', component: PageNotFoundComponent}
  ]  
}
   

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents ={LoginComponent,SignUpComponent}