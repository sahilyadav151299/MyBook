import { Component, OnInit } from '@angular/core';
import { UserPackagesService } from 'src/app/services/user-packages.service';

@Component({
  selector: 'app-package-data',
  templateUrl: './package-data.component.html',
  styleUrls: ['./package-data.component.css']
})

export class PackageDataComponent implements OnInit {

  packageData : any [] = []

  constructor( private userPackagesService : UserPackagesService ) { }

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

  ngOnInit() {
  }

}
