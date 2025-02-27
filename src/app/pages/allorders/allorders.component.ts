import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { IAllProduct } from '../../shared/interfaces/iall-product';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly ordersService = inject(OrdersService)
  idUser:string = ''
arrayAllProduct:IAllProduct[]=[]
 
  ngOnInit(): void {
    
    this.authService.saveToken()
    this.idUser = this.authService.userData.id
    console.log(this.idUser);
    this.getOrders()
    
  }
  getOrders():void{
    this.ordersService.getAllOrders(this.idUser).subscribe({
      next:(res)=>{
        this.arrayAllProduct = res
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

}
