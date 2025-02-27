import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  name:string = ''
 private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
 allProducts:IProduct[]= []
 wishList: Set<string> = new Set();
 getProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.allProducts = res.data
    },
    error:(err)=>{
      console.log(err);
    }
   })
}
ngOnInit(): void {
  this.getProductsData()
  this.loadWishlist()
}

addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
  console.log(res);
  this.toastrService.success(res.message )
  this.cartService.cartNumber.set(res.numOfCartItems
  )
  }
  })
  }

  addToWishList(id: string): void {
    if (this.wishList.has(id)) {
      this.wishlistService.removeProductFromWishList(id).subscribe({
        next: () => {
          this.wishList.delete(id); 
          this.toastrService.error("Product remove successfully to your wish list");
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
  loadWishlist(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishList = new Set(res.data.map((product: any) => product.id));
      }
    });
  }

  isInWishList(id: string): boolean {
    return this.wishList.has(id);
  }
  
}
