import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:9006";
  verifyAccount(email: string, otp: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/verify-account/${email}/${otp}`,null, {responseType:'text'});
  }
  resendOtp(email: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/regenerate-otp/${email}`,null, {responseType:'text'});
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/forgot-password?email=${email}`, null, { responseType: 'text' });
  }
  setPassword(email: string, newPassword: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/set-password?email=${email}&newPassword=${newPassword}`, null, { responseType : 'text'});
  }
}
