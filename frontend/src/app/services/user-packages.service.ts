import { userToken } from './../util/config';
import { PORT_NO } from './../util/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserPackagesService {

  constructor( private http : HttpClient ) { }

  getPackageData()  {

    const params = new HttpParams().set('customerId', userToken.userId)
    console.log(userToken.userId)

    return this.http.get(`http://localhost:${PORT_NO}/packages`, { params : params })
  }

  buyPackage( packageId : any){

    const data = {

      packageId : packageId,
      customerId : userToken.userId
    }

    return this.http.post(`http://localhost:${PORT_NO}/packages`, data)
  }

  updateUserPack(packId : any){

    const body = { id : packId }

    return this.http.put(`http://localhost:${PORT_NO}/packages`, body)
  }

}
