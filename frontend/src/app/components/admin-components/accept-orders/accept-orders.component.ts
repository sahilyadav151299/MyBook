import { Component, OnInit } from '@angular/core';
import {OrderDataService} from '../../../services/order-data.service'



@Component({
  selector: 'app-accept-orders',
  templateUrl: './accept-orders.component.html',
  styleUrls: ['./accept-orders.component.css']
})

export class AcceptOrdersComponent implements OnInit {
  orders: any[] = [];
  
  constructor(private placedOrders: OrderDataService) {  }

  ngOnInit():void {
     
    this.placedOrders.getplacedOrders().subscribe((allplacedOrders:any)=>{
     
      this.orders = allplacedOrders;
      console.log(this.orders)
    })
  }

  getOrderIdForApprove(orderId : any){
    console.log(orderId)
  }

}
