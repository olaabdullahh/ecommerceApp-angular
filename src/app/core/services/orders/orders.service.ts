import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http:HttpClient) { }

  checkOutOnLine(id:string , data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , 
      {
        "shippingAddress": data
    }
    )
  }
  getAllOrders(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/v1/orders/user/${id}` , 
    )
  }
}
