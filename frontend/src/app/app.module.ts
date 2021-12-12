import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';

import { OrdersComponent } from './components/orders/orders.component';
import { PackageDataComponent } from './components/package-data/package-data.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component'

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OrderDataService } from './services/order-data.service';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


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
  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [ OrderDataService ],

  bootstrap: [AppComponent]
})

export class AppModule { }
