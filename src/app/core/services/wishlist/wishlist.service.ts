import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }


getLoggedUserWishList():Observable<any>{
  return this.http.get(`${environment.baseUrl}/api/v1/wishlist`)
}
removeProductFromWishList(id:string):Observable<any>{
  return this.http.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
}
addProductToWishList(id:string):Observable<any>{
  return this.http.post(`${environment.baseUrl}/api/v1/wishlist`, {
    "productId": id
})
}

}
