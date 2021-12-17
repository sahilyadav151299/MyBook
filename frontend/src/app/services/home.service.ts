import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PORT_NO } from '../util/config';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor( private http : HttpClient ) { }

  displaySuggestedBooks() {

    return this.http.get(`http://localhost:${PORT_NO}/home/suggested-books`);
  }

  displayBook( filterby : string ) {

     return this.http.get(`http://localhost:${PORT_NO}/home/filtered-books/${filterby}`);
  }
}






