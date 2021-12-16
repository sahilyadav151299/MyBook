import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auth = false
  role = 0

  constructor( private router : Router ) { }

  ngOnInit() {

    let token = localStorage.getItem('userToken')

    if(token){

      this.auth = JSON.parse(token).auth 
      this.role = JSON.parse(token).role
    }
  
  }

  onLogout(){

    localStorage.removeItem('userToken')

    this.auth = false
    
    alert('You have successfully logged out!')
    
    var reload = () => {
      window.location.href = './index.html'
    }

    setTimeout(reload, 500)
  }
}
