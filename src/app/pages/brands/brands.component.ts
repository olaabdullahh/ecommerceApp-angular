import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
private readonly brandsService = inject(BrandsService)

brandsData:any[]=[]
ngOnInit(): void {
  this.brandsService.getAllPrands().subscribe({
    next:(res)=>{
      this.brandsData = res.data
      console.log(res.data);
      
    }
  })
}


}
