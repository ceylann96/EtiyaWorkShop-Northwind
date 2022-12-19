import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { DashboardProductsListComponent } from './components/dashboard-products-list/dashboard-products-list.component';
import { FilterAllPipe } from './pipes/filter-all.pipe';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductCardComponent,
  ProductListComponent,
ProductFormComponent,
ProductFormPageComponent,
DashboardProductsPageComponent,
FilterProductPipe,
    FilterProductByPricePipe,
  DashboardProductsListComponent,
FilterAllPipe],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ProductListComponent,
  ProductFormPageComponent,
FilterProductByPricePipe,
FilterProductPipe,
ProductCardComponent]
})
export class ProductsModule { }
