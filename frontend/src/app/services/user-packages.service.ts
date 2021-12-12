import { PORT_NO } from './../util/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserPackagesService {

  constructor( private http : HttpClient ) { }

  getPackageData()  {
    
    return this.http.get(`http://localhost:${PORT_NO}/packages`)
  }

  buyPackage( packageId : any){

    const data = {

      packageId : packageId,
      customerId : '61ae03486c0db019cc97a622'
    }

    return this.http.post(`http://localhost:${PORT_NO}/packages`, data)
  }

}
