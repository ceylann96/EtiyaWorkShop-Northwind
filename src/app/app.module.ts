import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttprequestInterceptor } from './core/interceptors/httprequest.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './features/products/products.module';
import { CategoriesModule } from './features/categories/categories.module';
import { CartModule } from './features/cart/cart.module';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), SharedModule, CoreModule, ProductsModule, CategoriesModule,CartModule
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttprequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
