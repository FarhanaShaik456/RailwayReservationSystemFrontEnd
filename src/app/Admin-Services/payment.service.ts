import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:9001/payment/getAllPayment";
  getPaymentList():Observable<any>{
    // console.log("******");
    return this.http.get(`${this.baseUrl}`);

  }
}
