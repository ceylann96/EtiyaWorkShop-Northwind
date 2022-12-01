import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId!: number;
  product!: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService) { }


  ngOnInit(): void {
    this.getProductFromRoute();
    this.getById();
  }

  getProductFromRoute(){
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId'] !== undefined)
        this.productId = Number(params['productId']);
    });
  }

  getById() {
    this.productsService.getById(this.productId).subscribe(res => {
      this.product = res;
    })
  }

}
