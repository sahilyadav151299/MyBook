import { UserService } from 'src/app/services/user.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})

export class AddToCartComponent implements OnInit {

  cartBookdata : any[] = []

  custAddress = {
    id: '',
    address : '',
    city: '',
    state: '',
    pincode: ''
  }

  constructor( private orderDataService :OrderDataService,
               private userService : UserService   ) { }

  ngOnInit() {

    const cartBookId = localStorage.getItem("cartBookId")
    localStorage.setItem("flag", "true")

    if(cartBookId !== null){

      this.orderDataService
      .getCartData(cartBookId)
      .subscribe(( data : any ) => {
        
        if(data.address){

          const userAddress = data.address

          this.custAddress.id = userAddress._id
          this.custAddress.address = userAddress.address
          this.custAddress.city = userAddress.city
          this.custAddress.state = userAddress.state
          this.custAddress.pincode = userAddress.pincode
        }

        const bookData = data.cartBookData

        for(const book of bookData){

          const obj = {
            
            id : book._id,
            author : book.author,
            book_name : book.book_name,
            category : book.category_name,
            date : book.publish_date,
          }

          this.cartBookdata.push(obj)
        }

      })
    }
  }

  onSubmit(addressFormData : any){

    const flag : boolean = confirm("Do you really want to change the address?")

    if(flag){

      const newAddress = addressFormData

      this.userService
        .changeAddress(newAddress)
        .subscribe( ( res : any ) => {
          
          if(res.status === 200){
            alert(res.message)
          }

          if(res.errCode === 500){
            alert(res.message)
          }
            
        })
    
    }
  }

  removeItem(){
  }

  placeOrder(){

    alert("You have successfully placed the order!")

    localStorage.removeItem("cartBookId")
    localStorage.removeItem("flag")
    window.location.reload();
  }
}
