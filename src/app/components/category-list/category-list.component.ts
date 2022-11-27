import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  title: string = 'Category List';
  categories!: Category[];


  

  
  private _categoriesListItems: any[] = [{ label: 'All', value: null }];
  
  get categoriesListItems(): any[] {
    
    return [
      ...this._categoriesListItems,
      ...this.categories.map((c) => {
        return { label: c.name, value: c.id };
      }),
    ];
  }
  
  set categoriesListItems(value: any[]) {
    this._categoriesListItems = value;
  }

  public selectedCategoryId: number | null = null;

  
  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
 
  }

  ngOnInit(): void {
    
    this.getSelectedCategoryIdFromRoute();
    this.getListCategories();
  }

  getListCategories() {
    this.categoriesService.getList().subscribe((response) => {
      this.categories = response;
    });
  }

  getSelectedCategoryIdFromRoute() {
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId'] !== undefined)
        this.selectedCategoryId = Number(params['categoryId']);
    });
  }



  isSelectedCategory(categoryId: number | null): boolean {
    return categoryId === this.selectedCategoryId;
  }
}