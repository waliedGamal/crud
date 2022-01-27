import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  productIndex:any
  Dataupdate = new BehaviorSubject(null);
  
  checkedit= new BehaviorSubject(false); //
  update(data:any){

  this.Dataupdate.next(data)
  this.checkedit.next(false)

  }


}
