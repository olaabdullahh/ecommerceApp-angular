import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cartNumber:WritableSignal<number> = signal(0)
 

constructor(private http:HttpClient) { }
  addProductToCart(productId:string):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/cart`,
      {
      "productId": productId
  }
)
  }
  getLoggedUserCart():Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/cart`
)
  }
  removeSpicificCartItem(id:string):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/api/v1/cart/${id}` )
  }
  updateCartProductQuantity(id:string , newCount:number):Observable<any>{
    return this.http.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
    } )
  }
  clearUserCart():Observable<any>{
    return this.http.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
