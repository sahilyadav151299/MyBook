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
  AddBook(data : any){
    return this.httpClient.post(`http://localhost:${PORT_NO}/admin/book/add-book`, data)
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
  updateBook(data : any, id : any){
    console.log(data)
    return this.httpClient.put(`http://localhost:${PORT_NO}/admin/book/update-book/${id}`, data)
    .pipe(catchError(this.handleError))
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