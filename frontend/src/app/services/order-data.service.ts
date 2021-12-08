import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PORT_NO } from '../util/config';

@Injectable({
  providedIn: 'root'
})

export class OrderDataService {

constructor( private http : HttpClient ) { }

  getOrderData()  {
    
    return this.http.get(`http://localhost:${PORT_NO}/orders`)
  }

}
