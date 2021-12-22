import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import {OrderDataService} from '../../../services/order-data.service'



@Component({
  selector: 'app-accept-orders',
  templateUrl: './accept-orders.component.html',
  styleUrls: ['./accept-orders.component.css']
})

export class AcceptOrdersComponent implements OnInit {
  orders: any[] = [];
  NgZone: any;
  Router: any;
 
  
  constructor(private placedOrders: OrderDataService ) {  }

  ngOnInit():void {
     
    this.placedOrders.getplacedOrders().subscribe((allplacedOrders:any)=>{
     
      this.orders = allplacedOrders;
      console.log(this.orders)
    })
  }



  getOrderIdForApprove(orderId : any){

        this.placedOrders.getApproveOrder(orderId)
        .subscribe(()=> {

          Swal.fire({
            icon: 'success',
            text: 'Return order has been closed!'
          })

          var reload = () => {
            return window.location.reload()
          }
          setTimeout(reload, 1000)
        }) 
    }


   




}
