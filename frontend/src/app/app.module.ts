import { PackageDataComponent } from './components/package-data/package-data.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from './components/orders/orders.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDataService } from './services/order-data.service';

@NgModule({

  declarations: [
    AppComponent,
    OrdersComponent,
    PackageDataComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],

  providers: [ OrderDataService ],

  bootstrap: [AppComponent]
})

export class AppModule { }
