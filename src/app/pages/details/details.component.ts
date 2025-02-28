import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly productsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
   private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)
  spicificProduct:IProduct | null = null

  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout:2000,
      autoplayHoverPause: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        }
      },
      nav: false
    }
ngOnInit(): void {
 
  this.activatedRoute.paramMap.subscribe({
    next:(p)=>{
const idProduct = p.get("id") !
      console.log(p.get("id"));
      this.productsService.getSpecificProduct( idProduct).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.spicificProduct = res.data
        }
      })
    }
  })
 
}
addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
  console.log(res.message);
  this.toastrService.success(res.message)
  this.cartService.cartNumber.set(res.numOfCartItems)

    },
    error:(err)=>{
      console.log(err);
      
    }
  })
  }



}
