import { Pipe, PipeTransform } from '@angular/core';
import { FilteredProducts } from '../models/filteredProduct';
import { Product } from '../models/product';

@Pipe({
  name: 'filterAll'
})
export class FilterAllPipe implements PipeTransform {

  transform(products: Product[], name:string,unitPrice:number,operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq'): Product[] {
    let filteredProducts: Product[] = products;

    if(name){
      filteredProducts = products.filter((p)=> {
        p.name.toLowerCase().includes(name.toLowerCase())
      })
    }

    // if(supplier) {
    //   filteredProducts = products.filter((p)=>{
    //     p.supplierId == supplier
    //   })
    // }
  
    if(unitPrice){
      switch (operator) {
        case 'eq':
          filteredProducts = products.filter((p) => p.unitPrice == unitPrice);
          break;
        case 'lte':
          filteredProducts = products.filter((p) => p.unitPrice <= unitPrice);
          break;
        case 'gte':
          filteredProducts = products.filter((p) => p.unitPrice >= unitPrice);
          break;
        case 'gt':
          filteredProducts = products.filter((p) => p.unitPrice > unitPrice);
          break;
        case 'lt':
          filteredProducts = products.filter((p) => p.unitPrice < unitPrice);
          break;
      }
    }

    return filteredProducts;
  
  }

}
