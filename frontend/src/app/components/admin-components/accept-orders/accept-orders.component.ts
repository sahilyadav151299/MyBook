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
  
 
  
  constructor(private placedOrders: OrderDataService ) {  }

  ngOnInit():void {
     // it will return the information of orders
    this.placedOrders.getplacedOrders().subscribe((allplacedOrders:any)=>{
     console.warn(allplacedOrders);
      this.orders = allplacedOrders;
      console.log(this.orders)
    })
               }

  // this will run after clicking on approve button
  approved_order(id:any )
    {
      console.log(id);
      this.placedOrders.getApproveOrder(id).subscribe(()=>{

        var reload = () => {
          return window.location.reload()
        }
        setTimeout(reload, 1000)

      }) 
      
      
    }


   




}
