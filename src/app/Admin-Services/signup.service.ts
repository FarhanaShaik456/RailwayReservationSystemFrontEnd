import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  
  baseUrl = "http://localhost:9006/register"

  signupUser(data : any):Observable<any>{
    console.log("******"+data);

    return this.http.post(`${this.baseUrl}/addUser` , data,{responseType:'text'});

  }
}
