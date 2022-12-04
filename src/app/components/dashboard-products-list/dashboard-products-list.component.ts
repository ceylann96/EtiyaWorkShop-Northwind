import { Component, OnInit } from '@angular/core';
import { GetListOptionsType } from 'src/app/models/get-list-options';
import { Pagination } from 'src/app/models/pagination';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-products-list',
  templateUrl: './dashboard-products-list.component.html',
  styleUrls: ['./dashboard-products-list.component.css']
})
export class DashboardProductsListComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProductList({ pagination: this.pagination });

  }

  products!: Product[];
  pagination: Pagination = {
    page: 1,
    pageSize: 13,
  };
  lastPage?: number;


  getProductList(options?: GetListOptionsType) {

    this.productService.getList(options).subscribe((response) => {
      if (response.length < this.pagination.pageSize) {
        if (response.length === 0 && this.pagination.page > 1) {
          this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }
      }

      this.products = response;

    })
  }

  changePage(page: number): void {
    this.pagination.page = page;
    this.getProductList({
      pagination: this.pagination,
    });
  }
}
