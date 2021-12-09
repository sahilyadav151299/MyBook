import { Component, OnInit } from '@angular/core';
import { UserPackagesService } from 'src/app/services/user-packages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-package-data',
  templateUrl: './package-data.component.html',
  styleUrls: ['./package-data.component.css']
})

export class PackageDataComponent implements OnInit {

  packageData : any [] = []

  constructor( private userPackagesService : UserPackagesService,
               private modalService: NgbModal ) { }

  fetchPackageData(){

    this.userPackagesService
      .getPackageData()
      .subscribe( (data : any ) => { 

        for(const pack of data.packageData){

          const packageObj = {

            packageName : pack.package_name,
            maxBook : pack.max_book,
            price : pack.price,
            validity : pack.validity
          }

          this.packageData.push(packageObj)
        }
    })
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { size: 'sm' });
  }

  ngOnInit() {
  }

}
