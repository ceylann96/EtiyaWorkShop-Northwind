import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';


@NgModule({
  declarations: [
    
    CartSummaryComponent,
    
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: []
})
export class CartModule { }
