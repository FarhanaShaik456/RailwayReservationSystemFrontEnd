import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  private createRequestOptions(): { headers: HttpHeaders } {
    const token = 'Bearer ' + sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': token

    });
    const requestOptions = {
      headers: headers
    };
    return requestOptions;
  }

  baseUrl = 'http://localhost:9001/registration/autherization';
  username = sessionStorage.getItem('username');

  updateProfile(data : any):Observable<any>{
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.baseUrl}/updateUserDetails/${this.username}`, data, requestOptions);
  }
  
  showuserdetails(data:any):Observable<any>
  {
      return this.http.get(`${this.baseUrl}/getbyUsername/${this.username}`, data);
  }
}
