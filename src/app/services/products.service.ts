import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetListOptions, GetListOptionsType } from '../models/get-list-options';
import { Pagination } from '../models/pagination';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  controllerUrl:string =`${environment.apiUrl}/products`;
  
  constructor(private httpClient: HttpClient) { }

  getList(options?: GetListOptionsType): Observable<Product[]> {
    // const {pagination}= options ?? {};
    let queryParams: any = {}
    if(options?.pagination) {
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
      }

      if (options?.filters) {
        queryParams['name_like'] = options.filters;
        queryParams = { ...queryParams, ...options.filters };
        
      }
      // if(options?.filters){
      //   queryParams['name_like']=options.filters.name;
      // }

    // if(options?.filters){
    //   queryParams['name_like']=options.filters.name;
    // }log
    //console.log(queryParams);
    
    return this.httpClient.get<Product[]>(this.controllerUrl, {
      params: queryParams,
    });
  }

 

  getById(productId:number):Observable<Product>{
    
    return this.httpClient.get<Product>(`${this.controllerUrl}/${productId}`);
}

add(request:Product): Observable<Product> {
  return this.httpClient.post<Product>(this.controllerUrl,request)
}

update(request: Product): Observable<Product> {
  return this.httpClient.put<Product>(
    `${this.controllerUrl}/${request.id}`,
    request
  );
}

delete(productId: number): Observable<Product> {
  return this.httpClient.delete<Product>(
    `${this.controllerUrl}/${productId}`
  );
}


}


