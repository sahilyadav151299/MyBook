import { UserService } from 'src/app/services/user.service';
import { OrderDataService } from 'src/app/services/order-data.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

            Swal.fire({
              icon: 'success',
              text: res.message
            })
          }

          if(res.errCode === 500){
            alert(res.message)
          }
            
        })
    }
  }

  removeItem( bookId : any ){

    const status = confirm('Do you really want to remove the product?')

    if(status){
      
      const newCartBookId = []
      let flag = true

      for(const data of this.cartBookdata){

        if(bookId === data.id && flag === true){
          flag = false
          continue
        }

        newCartBookId.push(data.id)
      }

      localStorage.setItem("cartBookId", JSON.stringify(newCartBookId) )
      window.location.reload();
    }    
  }

  placeOrder(){

    this.orderDataService
      .placeOrder(this.cartBookdata)
      .subscribe(( res : any ) => {
        
        console.log(res)

        if(res.status === 406){
          alert(res.message)
        }
        
        if(res.status === 200){

          Swal.fire({
            icon: 'success',
            text: res.message
          })
  
          // After 1 seconds it will automatically reload the page
          var reload = function(){
            return window.location.reload();
          }

          localStorage.removeItem("cartBookId")
          localStorage.removeItem("flag")
          setTimeout(reload, 1000);
        }

        if(res.errCode === 500){
          alert(res.message)
        }

        if(res.errCode === 404){
          alert(res.message)
        }
      })


    
  }
}
