import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';

const routes: Routes = [{path:'',pathMatch:'full', component: HomePageComponent},
{path:'login', component:LoginPageComponent},
{path:'category/:categoryId',component:HomePageComponent},
{path:'product/:productId',component:ProductDetailsComponent},
{path:'cart',component:CartComponent},
{
  path: 'dashboard', // Grand Parent route
    children: [
      {
        path: 'products', // Parent route
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DashboardProductsPageComponent,
          },
          { path: 'add', component: ProductFormPageComponent }, //= dashboard/products/add
          { path: 'edit/:productId', component: ProductFormPageComponent },
        ],
      },
    ],

    
},
{path: 'dashboard',
children: [
  {
    path: 'categories',
    children:[
      {path:'',
      pathMatch:'full',
      component:DashboardCategoriesPageComponent,
    },
    {path:'add', component: CategoryFormPageComponent},
    {path: 'edit/:categoryId', component: CategoryFormPageComponent},
    ],
  },
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
