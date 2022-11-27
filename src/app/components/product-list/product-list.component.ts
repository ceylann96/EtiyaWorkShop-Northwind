import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';

  products!: Product[];
  isLoaded:boolean = false; 




  selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;
  get filteredProducts(): any[] {
    
    let filteredProducts = this.products;

    if (this.selectedProductCategoryId)
      filteredProducts = filteredProducts.filter(
        (p:any) => p.categoryId === this.selectedProductCategoryId
      );

    if (this.searchProductNameInput)
      filteredProducts = filteredProducts.filter((p:any) =>
        p.name
          .toLowerCase()
          .includes(this.searchProductNameInput?.toLowerCase())
      );

    return filteredProducts;
  }

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,
    private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
    this.getListProducts();
  }

  getListProducts() {
    this.productsService.getList().subscribe((response) => {
     //Api'den gelen cevapla beraber spinner tanımını aynı setTimeout içine alarak 
     //spinnerimizi görebildik. 
      setTimeout(()=>{
        this.products = response;
        this.isLoaded=true;
      },700)
      
    });
  }


  getSearchProductNameFromRoute():void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams['searchProductName'] &&
       queryParams['searchProductName']!== this.searchProductNameInput)
        this.searchProductNameInput = queryParams['categoryId'];
      if(!queryParams['searchProductName'] &&
      this.searchProductNameInput !==null
      )
      this.searchProductNameInput= null;
      
     });
  }

  getCategoryIdFromRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId'])
        this.selectedProductCategoryId = parseInt(params['categoryId']);
      else this.selectedProductCategoryId = null;
  });
  }

  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }

  onSearchProductNameChange(event: any): void {
    
    
    const queryParams:any = {};
    if(this.searchProductNameInput !== '')
    queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
        
    })
  }
}