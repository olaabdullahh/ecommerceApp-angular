import { SubcategoryService } from './../../core/services/subcategory/subcategory.service';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
    private readonly categoriesService = inject(CategoriesService)
    // private readonly subcategoryService = inject(SubcategoryService)

    categoryData:ICategory[]=[]
    subcategoryData:any[]=[]
ngOnInit(): void {
  this.getCategory()
  // this.getsubcategory()
}
getCategory():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoryData = res.data
      
    }
  })
}
getsubcategory(id:string):void{
this.categoriesService.getSpecificCategories(id).subscribe({
  next:(res)=>{
    console.log(res);
    
  }
})
}

}
