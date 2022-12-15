import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { CartModule } from './cart/cart.module';
import { CartComponent } from './cart/components/cart/cart.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    CartModule
  ],
  exports: [CartComponent]
})
export class FeaturesModule { }
