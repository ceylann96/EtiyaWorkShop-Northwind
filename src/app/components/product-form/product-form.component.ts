import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productToUpdate: Product | null = null;
  
  get isEditting():boolean {
    return this.productToUpdate !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.productForm = new FormGroup({
    //   name: new FormControl(''),
    // });
  }

  ngOnInit(): void {
    this.getProductIdFromRoute();
    this.createProductForm();
  }

  createProductForm(): void {
    this.productForm = this.formBuilder.group({
      supplierId: [0, Validators.min(1)],
      categoryId: [0, Validators.min(1)],
      quantityPerUnit: ['', Validators.required],
      unitPrice: [0, Validators.min(0)],
      unitsInStock: [0, Validators.min(0)],
      unitsOnOrder: ['', Validators.min(0)],
      reorderLevel: ['', Validators.min(0)],
      discontinued: [false],
      name: ['', [Validators.required, Validators.minLength(2)]], //: array, form control'ün parametrelerini temsil eder. 1. eleman default değer, 2. eleman validators
    });
  }

  getProductIdFromRoute() {
    this.activatedRoute.params.subscribe((params)=> {
      if(params['productId']) this.getProductById(params['productId']);
    })
  }
  getProductById(productId: number) {
    this.productsService.getById(productId).subscribe((response)=>{
    this.productToUpdate= response;
    this.productForm.patchValue(this.productToUpdate);
    })
  }



  onProductFormSubmit(): void {
    if (this.productForm.invalid) {
      this.toastrService.error('please fill in the form correctly');
      return;
    }
    if(this.isEditting) this.update()
    else this.add();
  }
  update():void {
    const request: Product = {
      id: this.productToUpdate!.id,
      categoryId: Number.parseInt(this.productForm.value.categoryId),
      supplierId: Number.parseInt(this.productForm.value.supplierId),
      quantityPerUnit: this.productForm.value.quantityPerUnit,
      unitPrice: Number.parseFloat(this.productForm.value.unitPrice),
      unitsInStock: Number.parseInt(this.productForm.value.unitsInStock),
      unitsOnOrder: Number.parseInt(this.productForm.value.unitsOnOrder),
      reorderLevel: Number.parseInt(this.productForm.value.reorderLevel),
      discontinued: this.productForm.value.discontinued,
      name: this.productForm.value.name.trim(),
    };
  
this.productsService.update(request).subscribe((response)=>{
  this.productToUpdate=response;
  this.toastrService.success('product updated successfully');
})
    }

    onDeleteProduct():void {
      this.delete();
    }
    delete(): void {
      this.productsService.delete(this.productToUpdate!.id).subscribe(() => {
        this.toastrService.success('Product deleted successfully');
        this.router.navigate(['/dashboard', 'products']);
      });
    }
  
  add() {
    //todo: product service yardımıyla ekleme
    const request: Product= {
    ...this.productForm.value, 
    name:this.productForm.value.name.trim(),
  };
  this.productsService.add(request).subscribe((response)=>{
    this.toastrService.success('product added succesfully')
    console.log(response);
    })
  }
}