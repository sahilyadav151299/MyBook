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
   

  closed_order(id:any )
  {
    console.log(id);
    this.retOrders.getclosedorder(id).subscribe(()=>{


      // console.log(id);
      // var reload = () => {
      //   this.router.navigate(['/user-orders']);
      // }

      // setTimeout(reload, 2000)


      var reload = () => {
        return window.location.reload()
      }
      setTimeout(reload, 1000)

    }) 
   

}
}
