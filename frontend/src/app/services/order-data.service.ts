import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PORT_NO } from '../util/config';

@Injectable({
  providedIn: 'root'
})

export class OrderDataService {

constructor( private http : HttpClient ) { }


  getOrderData(){

    // const params = new HttpParams().set('customerId', '61ae03486c0db019cc97a623')   // rohit
    const params = new HttpParams().set('customerId', '61ae03486c0db019cc97a622')   // sahil
    // const params = new HttpParams().set('customerId', '61ae03486c0db019cc97a625')   // savita
    // const params = new HttpParams().set('customerId', '61ae03486c0db019cc97a626')   // tushar 
    // const params = new HttpParams().set('customerId', '61ae03486c0db019cc97a624')   // vishal 
    
    return this.http.get(`http://localhost:${PORT_NO}/orders`, { params : params })
  }

  getCartData( cartBookId : any ){

    const params = new HttpParams().set('cartBookId', cartBookId).set('customerId', JSON.stringify('61ae03486c0db019cc97a622'))

    return this.http.get(`http://localhost:${PORT_NO}/cart`, { params : params })
  }

}
