
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWishList } from '../../shared/interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  myWishList:IWishList[]=[]

  private readonly wishlistService = inject(WishlistService)
      private readonly toastrService = inject(ToastrService)
      private readonly cartService = inject(CartService)
ngOnInit(): void {
 this.getWishListData()
}
getWishListData():void{
  this.wishlistService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      this.myWishList = res.data
      console.log(res.data);
      
    }
  })
}

removeProduct(id:string):void{
 Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.wishlistService.removeProductFromWishList(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.getWishListData()
          Swal.fire({
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      })
      
        }
      })

    }

addToCart(id: string): void {
      console.log(id);
      
      this.cartService.addProductToCart(id).subscribe({
        next: (res) => {
          console.log(res)
          this.toastrService.success(res.message)
          this.cartService.cartNumber.set(res.numOfCartItems
          )
        }
      })
    }
}




