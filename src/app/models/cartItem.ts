import { Product } from "./product";

export interface CartItem {
    product: Product
    quantity: number
    
    
    name:string
    quantityPerUnit:string
  
    unitPrice:number
    unitsInStock: number
    id:number
    
}
