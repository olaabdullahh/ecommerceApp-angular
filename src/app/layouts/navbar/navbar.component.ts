import { Component, computed, inject, input, Input, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
countNum:Signal<number> = computed(()=>  this.cartService.cartNumber() )
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)

      }
    })

}
  //  @Input() islogin:boolean = true;
  isLogin = input<boolean>(true)
  logOut():void{
    Swal.fire({
      title: "Are you sure to log out?",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut()
      }
    });

  }

}
