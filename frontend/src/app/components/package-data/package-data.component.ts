import { Component, OnInit } from '@angular/core';
import { UserPackagesService } from 'src/app/services/user-packages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-data',
  templateUrl: './package-data.component.html',
  styleUrls: ['./package-data.component.css']
})

export class PackageDataComponent implements OnInit {

  userPacks : any [] = []
  packageData : any [] = []
  packId : any 

  constructor( private userPackagesService : UserPackagesService,
               private modalService: NgbModal ) { }

    ngOnInit() {
      

    this.userPackagesService
      .getPackageData()
      .subscribe( (data : any ) => { 
        console.log(data)
        this.userPacks = data.userAllPackData

        for(const pack of data.packageData){

          const packageObj = {

            packageId : pack._id,
            packageName : pack.package_name,
            maxBook : pack.max_book,
            price : pack.price,
            validity : pack.validity
          }

          this.packageData.push(packageObj)
        }

        if(this.userPacks.length > 0){

          for(const pack of this.userPacks){  

            if(pack.status === 'Active'){  
              
              const buyDate = pack.buyAt
              const validity = pack.packData.validity
    
              const expiryDD = new Date(buyDate).getDate() + validity
              const expiryMM = new Date(buyDate).getMonth()
              const expiryYY = new Date(buyDate).getFullYear()   
                
              const expiryDate = new Date(expiryYY, expiryMM, expiryDD).toLocaleDateString()
              const today = new Date().toLocaleDateString() 

              if(new Date(today) >= new Date(expiryDate)){
      
                this.userPackagesService
                  .updateUserPack(pack.packId)
                  .subscribe((res : any) => {
  
                    this.userPacks = res

                    window.location.reload()
                  })
              }
            }
          }
        }
        
    })
  }

  purchase1(packID : any){
    this.packId = packID
  }

  purchase2(content : any) {
    this.modalService.open(content, { size: 'sm' });
  }

  confirmOrder(){

    this.userPackagesService
      .buyPackage(this.packId)
      .subscribe(( res : any ) => {

        if(res.status === 200){

          Swal.fire({
            icon: 'success',
            text: res.message
          })
          
          // After 1 seconds it will automatically reload the page
          var reload = function(){
            return window.location.reload();
          }

          setTimeout(reload, 2000);
        }

        if(res.status === 409){
          alert(res.message)
        }
        
        if(res.errCode === 500){
          alert(res.message)
        }

      })
    
  } 

}
