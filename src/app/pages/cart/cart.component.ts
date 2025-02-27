import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  cartDetails:ICart = {} as ICart
  cartNumber:number = 0

ngOnInit(): void {
  this.getCartData()
}
getCartData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      this.cartDetails = res.data
      this.cartNumber = res.numOfCartItems
      console.log(res.data._id);
      console.log(res)
    }, 
    error:(err)=>{
      console.log(err);
      
    }
  })
}
deleteCartItem(id:string):void{
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.removeSpicificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.cartDetails = res.data
          this.cartNumber = res.numOfCartItems
          this.cartService.cartNumber.set(res.numOfCartItems)
      Swal.fire({
        text: "Your file has been deleted.",
        icon: "success"
      });
        }
      })

    }
  });
 
}
updateCount(id:string , newCount:number):void{
this.cartService.updateCartProductQuantity(id , newCount).subscribe({
  next:(res)=>{
    console.log(res);
    this.cartDetails = res.data
    this.cartNumber = res.numOfCartItems
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}
clearCart():void{
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.clearUserCart().subscribe({
        next:(res)=>{
    console.log(res);
    this.cartDetails = {} as ICart;
    this.cartNumber = 0
    this.cartService.cartNumber.set(0)

    Swal.fire({
     text: "Your file has been deleted.",
        icon: "success"
    });
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
    }
  });
  
}

}
