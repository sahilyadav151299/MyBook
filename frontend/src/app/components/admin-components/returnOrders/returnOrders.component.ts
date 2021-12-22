import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { OrderDataService } from 'src/app/services/order-data.service';

@Component({
  selector: 'app-returnOrders',
  templateUrl: './returnOrders.component.html',
  styleUrls: ['./returnOrders.component.css']
})
export class ReturnOrdersComponent implements OnInit {

  orders: any[] = [];
  
  constructor(private retOrders: OrderDataService) {  }

  ngOnInit():void {
     
    this.retOrders.returnOrders().subscribe((allplacedOrders:any)=>{
     //console.warn(allplacedOrders);
      this.orders = allplacedOrders;
      console.log(this.orders)
    })

  }
   

  closed_order(returnOrderId : any ){
    
    this.retOrders.getclosedorder(returnOrderId)
      .subscribe(()=>{

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
