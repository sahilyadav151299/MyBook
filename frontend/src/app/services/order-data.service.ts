import { userToken } from './../util/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PORT_NO } from '../util/config';

@Injectable({
  providedIn: 'root'
})

export class OrderDataService {


constructor( private http : HttpClient ) { }

  getOrderData(){
   
    const params = new HttpParams().set('customerId', userToken.userId)
    
    return this.http.get(`http://localhost:${PORT_NO}/orders`, { params : params })
  }

  getCartData( cartBookId : any ){

    const params = new HttpParams().set('cartBookId', cartBookId).set('customerId', userToken.userId)

    return this.http.get(`http://localhost:${PORT_NO}/cart`, { params : params })
  }
  
  placeOrder( orderData : any ){

    const body = {
      orderData : orderData,
      customerId : userToken.userId
    }

    return this.http.post(`http://localhost:${PORT_NO}/orders`, body )
  }

  returnBooks( bookData : any, address : any ){

    const body = {
      bookData : bookData,
      address : address,
      customerId : userToken.userId
    }

    return this.http.post(`http://localhost:${PORT_NO}/orders/return-book`, body )

  }

  returnOrders(){

     return this.http.get(`http://localhost:${PORT_NO}/returnOrders`)

  }

  getplacedOrders(){

       return this.http.get(`http://localhost:${PORT_NO}/accept_order_byAdmin`)
  }
}
