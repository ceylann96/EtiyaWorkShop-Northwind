import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { Product } from 'src/app/features/products/models/product';
import { ProductsService } from 'src/app/features/products/services/products.service';
import { SuppliersService } from 'src/app/features/products/services/suppliers.service';

import { CartService } from 'src/app/features/cart/services/cart.service';
import {CartItem} from 'src/app/features/cart/models/cartItem';

import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/core/models/pagination';
import { Supplier } from '../../models/supplier';
import { GetListOptionsType } from 'src/app/core/models/get-list-options';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';
  priceFilterType: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq';
  supplierFilterType!:string
  products!: Product[];
  // selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;

  cartItems: CartItem[] = []
  
  pagination: Pagination = {
    page: 1,
    pageSize: 2,
  };
  lastPage?: number;
  filters: any = { productFilterPrice: 0 , supplierFilter:0};

  isLoading: number = 0;
  errorAlertMessage: string | null = null;
  suppliers!: Supplier[]


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private supplierService:SuppliersService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoading + 2;
    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
    this.getListSupplier()
    
  }
  getListSupplier(){
    this.supplierService.getList().subscribe((response)=> {
      this.suppliers=response
    })
  }

  onSearchPriceChange(event: any) {
    if (this.filters.productFilterPrice == null) {
      this.filters.productFilterPrice = 0;
    }
  }
  addToCartClick(product: Product) {
     // CartItem olu??tur..
    // cartService'den add metodunu ??a????r..
    let cartItem: CartItem = { product: product, quantity: 1 };
    this.cartService.addState(cartItem);
  }

  getProductsList(options?: GetListOptionsType): void {
    this.isLoading = this.isLoading + 1;

    
    this.productsService.getList(options).subscribe({
      next: (response) => {
       
        if (response.length < this.pagination.pageSize) {
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }

        this.products = response;
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  getCategoryIdFromRoute(): void {
   this.activatedRoute.params.subscribe((params) => {
      this.resetPagination();

      if (params['categoryId']) {
        this.filters['categoryId'] = parseInt(params['categoryId']);
      } else {
       if (this.filters['categoryId']) delete this.filters['categoryId']; 
        }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  getSearchProductNameFromRoute(): void {
    //: query params'lar?? almak ad??na activatedRoute.queryParams kullan??l??r.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      ) {
        this.searchProductNameInput = queryParams['searchProductName'];
        this.filters['name_like'] = this.searchProductNameInput;
      }
      //# Defensive Programming
      if (
        queryParams['searchProductName'] === undefined &&
        this.searchProductNameInput !== null
      ) {
        this.searchProductNameInput = null;
        delete this.filters['name_like'];
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  isProductCardShow(product: Product): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu i??lemi zaten ger??ekle??tiriyor.

    this.filters['name_like'] = this.searchProductNameInput;
    this.resetPagination();

    const queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
    });
  }

  changePage(page: number): void {
    this.pagination.page = page;
    this.getProductsList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }

  changePageS(pageSize:number):void {
    console.log(pageSize);
    
    this.pagination.pageSize++
    this.getProductsList({
      pagination: this.pagination,
      filters:this.filters
      
    })
  }

  resetPagination(): void {
    this.pagination.page = 1;
    this.lastPage = undefined;
  }
}
