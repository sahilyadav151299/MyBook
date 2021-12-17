import { ChangePasswordComponent } from './components/changePassword/changePassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditBookComponent } from './components/admin-components/edit-book/edit-book.component';
import { AddBookComponent } from './components/admin-components/add-book/add-book.component';
import { BookListComponent } from './components/admin-components/book-list/book-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookShelfComponent } from './components/book-shelf/book-shelf.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';

import { OrdersComponent } from './components/orders/orders.component';
import { PackageDataComponent } from './components/package-data/package-data.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component'


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDataService } from './services/order-data.service';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({

  declarations: [
    AppComponent,
    OrdersComponent,
    PackageDataComponent,
    SignUpComponent,
    LoginComponent,
    AddToCartComponent,
    HeaderComponent,
    FooterComponent,
    BookShelfComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    BookListComponent,
    AddBookComponent,
    EditBookComponent,
    DashboardComponent,
    ChangePasswordComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [ OrderDataService ],

  bootstrap: [AppComponent]
})

export class AppModule { }
