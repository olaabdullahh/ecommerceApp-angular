import { NgClass } from '@angular/common';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly toastrService = inject(ToastrService)
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  allProducts: IProduct[] = []
  AllCategories: ICategory[] = []
  product: IProduct = {} as IProduct
  name: string = ''
  wishList: Set<string> = new Set();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  silderStatic: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayTimeout: 2000,
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
    this.getProductsData()
    this.getCategoriesData()
    this.loadWishlist()
  }


  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.AllCategories = res.data

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getProductData(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.allProducts = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this.toastrService.success(res.message)
        this.cartService.cartNumber.set(res.numOfCartItems
        )
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  loadWishlist(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishList = new Set(res.data.map((product: any) => product.id));
      }
    });
  }

  addToWishList(id: string): void {
    if (this.wishList.has(id)) {
      this.wishlistService.removeProductFromWishList(id).subscribe({
        next: () => {
          this.wishList.delete(id); 
          this.toastrService.info("Product remove successfully to your wish list");
        }
      });
    } else {
      this.wishlistService.addProductToWishList(id).subscribe({
        next: () => {
          this.wishList.add(id); 
          this.toastrService.success("Product added successfully to your wish list");
          
        },
      });
    }
  }

  isInWishList(id: string): boolean {
    return this.wishList.has(id);
  }
}

