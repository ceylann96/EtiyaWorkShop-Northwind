import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { DashboardCategoriesPageComponent } from './features/categories/pages/dashboard-categories-page/dashboard-categories-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './shared/pages/login-page/login-page.component';
import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';
import { DashboardProductsPageComponent } from './features/products/pages/dashboard-products-page/dashboard-products-page.component';
import { CategoryFormPageComponent } from './features/categories/pages/category-form-page/category-form-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CartSummaryComponent } from './features/cart/pages/cart-summary/cart-summary.component';

const routes: Routes = [{path:'',pathMatch:'full', component: HomePageComponent},

{path:'category/:categoryId',component:HomePageComponent},

{path:'cart',component:CartSummaryComponent},
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
    canActivate: [AuthGuard],
    
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
