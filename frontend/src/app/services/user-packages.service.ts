import { PORT_NO } from './../util/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserPackagesService {

  constructor( private http : HttpClient ) { }

  getPackageData()  {

    const params = new HttpParams().set('customerId', JSON.stringify('61ae03486c0db019cc97a622'))

    return this.http.get(`http://localhost:${PORT_NO}/packages`, { params : params })
  }

  buyPackage( packageId : any){

    const data = {

      packageId : packageId,
      customerId : '61ae03486c0db019cc97a622'
    }

    return this.http.post(`http://localhost:${PORT_NO}/packages`, data)
  }

}
