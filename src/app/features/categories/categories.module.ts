import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';


@NgModule({
  declarations: [ CategoryListComponent,
    CategoryFormComponent,
  DashboardCategoriesListComponent,
CategoryFormComponent,
DashboardCategoriesPageComponent,
CategoryFormPageComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CategoryFormComponent,CategoryFormComponent,CategoryListComponent]
})
export class CategoriesModule { }
