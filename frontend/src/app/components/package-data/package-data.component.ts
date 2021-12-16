import { Component, OnInit } from '@angular/core';
import { UserPackagesService } from 'src/app/services/user-packages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
          
          alert(res.message)
          // After 1 seconds it will automatically reload the page
          var reload = function(){
            return window.location.reload();
          }

          setTimeout(reload, 1000);
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