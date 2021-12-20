import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../components/models/book';
import { catchError, map } from 'rxjs/operators';
import { PORT_NO } from 'src/app/util/config';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  //Nodejs api
  REST_API:String = `http://localhost:${PORT_NO}/admin/book`;

  //set http header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient:HttpClient) { }

  //add records 
  AddBook(data:Book):Observable<any>{

    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }

  //get all records
  getBooks(){
    return this.httpClient.get(`${this.REST_API}/book-list`);
  }

  // get single book
  getBook(id:any): Observable<any>{
    let API_URL =`${this.REST_API}/get-one-book/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  } 
  
  //update book data 
  updateBook(id:any,data:any):Observable<any>{
    let API_URl = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URl, data, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    ) 
  }

  //delete
  deleteBook(id:any): Observable<any>{
    let API_URl = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URl, {headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    ) 
}



//error
handleError(error:HttpErrorResponse){
let errorMessage = '';
if(error.error instanceof ErrorEvent){
  //handleclient error
  errorMessage = error.error.message;
}else{
  //handleError server error
  errorMessage = `Error Code: ${error.status}\nMesssage:${error.message}`; 
}
console.log(errorMessage);
return throwError(errorMessage); 

}


}