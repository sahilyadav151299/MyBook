import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AcceptOrdersComponent } from './components/admin-components/accept-orders/accept-orders.component';
import { ChangePasswordComponent } from './components/changePassword/changePassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditBookComponent } from './components/admin-components/edit-book/edit-book.component';
import { AddBookComponent } from './components/admin-components/add-book/add-book.component';
import { BookListComponent } from './components/admin-components/book-list/book-list.component';
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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ReturnOrdersComponent } from './components/admin-components/returnOrders/returnOrders.component';


let token = localStorage.getItem('userToken');
let auth = false;
let role = 0;
let routes: Routes;

if (token) {
  auth = JSON.parse(token).auth;
  role = JSON.parse(token).role;
}

if (auth && role === 0) {
  routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'packages', component: PackageDataComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'cart', component: AddToCartComponent },
    { path: 'book-shelf', component: BookShelfComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: '**', component: PageNotFoundComponent },
  ];
} else if (auth && role === 1) {
  routes = [
    { path: '', component: BookListComponent },
    { path: 'book-list', component: BookListComponent },
    { path: 'add-book', component: AddBookComponent },
    { path: 'edit-book/:id', component: EditBookComponent},
    { path: 'user-orders', component: AcceptOrdersComponent },
    {path: 'return-orders', component: ReturnOrdersComponent},
    { path: '**', component: PageNotFoundComponent }

  ] 

}else{

  routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'resetPassword', component: ResetPasswordComponent},
    { path: '**', component: PageNotFoundComponent },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = { LoginComponent, SignUpComponent };
