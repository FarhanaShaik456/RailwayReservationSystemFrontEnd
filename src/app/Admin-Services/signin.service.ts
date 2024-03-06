import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:9001/registration"

  signinUser(data : any):Observable<any>{
    console.log("******"+data);

    return this.http.post(`${this.baseUrl}/signin` , data);

  }

  private createRequestOptions(): { headers: HttpHeaders } {
    const token = 'Bearer ' + sessionStorage.getItem('token');
    // Define the headers
    const headers = new HttpHeaders({
      Authorization: token,
    });

    // Define the request options
    const requestOptions = {
      headers: headers,
    };

    return requestOptions;
  }

  baseUrl1 = 'http://localhost:9001/registration/autherization';
  username = sessionStorage.getItem('username')

  updatePassword(data : any): Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.put(
      `${this.baseUrl1}/updatethepassword/${this.username}`,data,
      requestOptions
    );
  }
}

