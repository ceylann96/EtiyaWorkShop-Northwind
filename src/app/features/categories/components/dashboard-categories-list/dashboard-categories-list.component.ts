import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/features/categories/models/category';
import { CategoriesService } from 'src/app/features/categories/services/categories.service';

@Component({
  selector: 'app-dashboard-categories-list',
  templateUrl: './dashboard-categories-list.component.html',
  styleUrls: ['./dashboard-categories-list.component.css']
})
export class DashboardCategoriesListComponent implements OnInit {
  constructor(private categoryService: CategoriesService){}
  
  ngOnInit(): void {
    this.getCategoryList();
  }

  categories!: Category[]

  getCategoryList(){
    this.categoryService.getList().subscribe((response)=> {
      this.categories=response
    })
  }
}
