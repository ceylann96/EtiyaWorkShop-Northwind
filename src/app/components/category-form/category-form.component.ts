import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}
  
  ngOnInit(): void {
    this.getCategoryIdFromRoute();
    this.createCategoryForm();
  }

  categoryForm!: FormGroup;
  categoryToUpdate: Category | null = null;

  get isEditting():boolean {
    return this.categoryToUpdate !== null;
  }

  createCategoryForm():void {
    this.categoryForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]]
    })
  };

  getCategoryIdFromRoute() {
    this.activatedRoute.params.subscribe((params)=> {
      if(params['categoryId']) this.getCategoryById(params['categoryId']);
    })
  }
  
  getCategoryById(categoryId: number) {
    this.categoryService.getById(categoryId).subscribe((response)=>{
      this.categoryToUpdate= response;
      this.categoryForm.patchValue(this.categoryToUpdate);
      })
  }

  onCategoryFormSubmit(): void {
    if (this.categoryForm.invalid) {
      this.toastrService.error('please fill in the form correctly');
      return;
    }
    if(this.isEditting) this.update()
    else this.add();
  }

  update():void {
    const request: Category = {
      id: this.categoryToUpdate!.id,
      name:this.categoryForm.value.name.trim(),
      description:this.categoryForm.value.description
    }
    this.categoryService.update(request).subscribe((response)=>{
      this.categoryToUpdate=response;
      this.toastrService.success('category updated successfully');
    })
  }
  add() {
   const request: Category= {
    ...this.categoryForm.value, 
    name:this.categoryForm.value.name.trim(),
  };
  this.categoryService.add(request).subscribe((response)=>{
    this.toastrService.success('category added succesfully')
    console.log(response);
    })
  }
  onDeleteCategory():void {
    this.delete();
  }
  delete(): void {
    this.categoryService.delete(this.categoryToUpdate!.id).subscribe(() => {
      this.toastrService.success('Category deleted successfully');
      this.router.navigate(['/dashboard', 'categories']);
    });
  }
  

}
