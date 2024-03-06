import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  private createRequestOptions(): { headers: HttpHeaders } {
   
    const token = 'Bearer ' + sessionStorage.getItem('token');
    // Define the headers
    const headers = new HttpHeaders({
      'Authorization': token
    });

    // Define the request options
    const requestOptions = {
      headers: headers
    };

    return requestOptions;
  }

  baseUrl = "http://localhost:9001/registration/autherization"
  username = sessionStorage.getItem('username');
  pnr = sessionStorage.getItem('pnr');

  bookTicket(data: any):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.post(`${this.baseUrl}/booking/${this.username}`, data, {...requestOptions,responseType:'text'});
  }


  getAllBookings():Observable<any[]>{
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/ViewAllBookings`,requestOptions);
  }

  viewByUserName(): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any>(`${this.baseUrl}/viewByUserName/${this.username}`, requestOptions)
  }

  getDetails(pnr: string): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any>(`${this.baseUrl}/ViewBookingTicketByItsTrainAndTotalCost/${pnr}`, requestOptions)
  }

  cancelTicket(pnr: any): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.delete<any>(`${this.baseUrl}/cancelingTicketByPnr/${pnr}`, requestOptions)
  }

}

