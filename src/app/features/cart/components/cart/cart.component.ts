import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CartItem} from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems!: CartItem[]
product: Product[]= []


constructor(private cartService: CartService,
  ) {}

ngOnInit(): void {
    this.getListCart()
    console.log(this.cartItems);
   
}

getListCart() {
  this.cartService.getList().subscribe((response) => {
   this.cartItems = response;
   console.log(this.product);
   });
}

deleteToCart(id:number){


  //  this.cartItems = this.cartItems.filter((p)=>p.id !==id)
  this.cartService.delete(id).subscribe((response) =>{
  this.cartItems = response
  this.getListCart();
  
  
  });

}



}


