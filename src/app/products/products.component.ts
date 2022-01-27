import { DataService } from './../data.service';
import { Component, OnInit ,Input  } from '@angular/core';
import { Product } from './../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit   {

  constructor( public _DataService:DataService) { }

  @Input() Products:Product[]=[];

  ngOnInit(): void {
  }

  updateValues:boolean = false;
  searchValue:any
  searchProduct:any
  name:any='';
  ngDoCheck(): void {
    if(localStorage.getItem("Products") != null){
      this.Products = JSON.parse(localStorage.getItem("Products") || '')
    }
  }

  delete(i:number){
    this.Products.splice(i,1)
    this.SaveProduct()
  }

  update(i:number,product:any){
    this._DataService.productIndex = i;
    this._DataService.update(product);
    this._DataService.checkedit.next(true);
  }

  SaveProduct(){
    localStorage.setItem("Products",JSON.stringify(this.Products))
  }

  // search(search:any){
  //   this.searchProduct = this.Products
  //   this.searchValue = search.target.value
  //   for(let i=0; i<this.searchProduct.length;i++){
  //     if(this.searchProduct[i].Name.toLowerCase().includes(this.searchValue.toLowerCase())){
  //       this.Products = this.searchProduct[i]
  //       console.log(this.Products);
  //     }
  //   }
  // }

}
