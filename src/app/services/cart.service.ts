import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {CartItem}  from '../models/cartItem';
import {CartItems} from '../models/cartItems';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  controllerUrl:string =`${environment.apiUrl}/carts`;
  
  cartItems!: CartItem[]
  
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(this.controllerUrl);
  }

  add(request:Product): Observable<CartItem> {
  
  //   let item = this.cartItems.find((c)=> c.id === request.id )

  // if (item) {
  //   item.quantity+=1
  // }
  // else item.quantity==1
  
  return this.httpClient.post<CartItem>(this.controllerUrl,request)
  
    
  }

  delete(id: number): Observable<CartItem[]> {
    return this.httpClient.delete<CartItem[]>(
      `${this.controllerUrl}/${id}`
    );
  }

 

}
