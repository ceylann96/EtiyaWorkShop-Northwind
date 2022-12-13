import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';


@NgModule({
  declarations: [
    OverlayLoadingComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [OverlayLoadingComponent,]
})
export class CoreModule { }
