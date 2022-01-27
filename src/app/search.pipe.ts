import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[] , searchword:any): any {

    return products.filter((res)=>{

      return res.Name.includes(searchword);

    })
  }

}
