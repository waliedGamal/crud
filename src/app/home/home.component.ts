import { DataService } from './../data.service';
import { Component, OnInit ,DoCheck } from '@angular/core';
import { Product } from '../product';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,DoCheck {

  switch:boolean = false;

  constructor(public _DataService:DataService) { }

  ngOnInit(): void {

  this._DataService.checkedit.subscribe(value => {
    if(value == true){
      this.switch = true;
      this.setValue();
    }else{
      this.switch = false;
    }
  })
  }

  ngDoCheck(): void {
    if(localStorage.getItem("Products") != null){
      this.AllProducts = JSON.parse(localStorage.getItem("Products") || '')
    }
  }

  // Declarations //
  OneProduct:any;
  AllProducts:Product[]=[];
  value:any;


  // form Declaration
  SubProduct:FormGroup = new FormGroup({
    Name :new FormControl(null,[Validators.required]),
    Category :new FormControl(null,[Validators.required]),
    price :new FormControl(null,[Validators.required]),
    Description :new FormControl(null,[Validators.required])
  })


  Addproduct(product:FormGroup){
    this.OneProduct = product
      this.AllProducts.push(this.OneProduct.value)
      this.SaveProduct()
      this.OneProduct.reset()
  }

  Updateproduct(product:FormGroup){
    let index = this._DataService.productIndex;
    this.AllProducts[index] = product.value;
    this.SaveProduct();
    product.reset()
    this.switch = false;
  }

  SaveProduct(){
    localStorage.setItem("Products",JSON.stringify(this.AllProducts))
  }

  setValue(){
    this._DataService.Dataupdate.subscribe((res) => {
      this.value = res
      this.SubProduct.patchValue
      ({
        Name:this.value.Name ,
        Category:this.value.Category ,
        price:this.value.price ,
        Description:this.value.Description })
    })

  }




}
