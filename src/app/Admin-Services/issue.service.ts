import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}

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

  baseUrl = 'http://localhost:9001/registration/autherization';
  username = sessionStorage.getItem('username');
  issue = sessionStorage.getItem('issue');

  addissue(data: any): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.post(
      `${this.baseUrl}/issue/addIssue/${this.username}`,
      data,
      requestOptions
    );
  }
  getAllIssues(): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/issue/getAllIssues`, requestOptions);
  }

  getUserissue(): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(
      `${this.baseUrl}/issue/getUserissues/${this.username}`,
      requestOptions
    );
  }

  getIssuesByUserName(username: string): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(
      `${this.baseUrl}/issue/getByUsername/${username}`,
      requestOptions
    );
  }
  updateIssue(data: any): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.put(
      `${this.baseUrl}/issue/update/${this.issue}`,data,
      requestOptions
    );
  }
}
