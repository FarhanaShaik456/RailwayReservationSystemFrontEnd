import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

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

  baseUrl = "http://localhost:9001/registration/autherization";
  trainNo = sessionStorage.getItem('trainNo');

  addTrain(data: any): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.post(`${this.baseUrl}/addtrain`, data, requestOptions);
  }

  getAllTrains(): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/viewalltrains`);
  }


  getTrainByNo(trainNo: string): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any>(`${this.baseUrl}/viewtrainbyno/${trainNo}`, requestOptions);
  }

  getTrainsByName(trainName: string): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/viewtrainbyname/${trainName}`, requestOptions);
  }

  deleteTrain(trainNo: string): Observable<string> {
    const requestOptions = this.createRequestOptions();
    return this.http.delete<string>(`${this.baseUrl}/deletetrain/${trainNo}`, requestOptions);
  }

  updateTrain(trainNo: string, data: any): Observable<any> {
    const requestOptions = this.createRequestOptions();
    return this.http.put(`${this.baseUrl}/udatetrain/${trainNo}`, data, requestOptions);
  }
  
  findByLocation(trainFrom: string, trainTo: string): Observable<any[]> {
    const requestOptions = this.createRequestOptions();
    return this.http.get<any[]>(`${this.baseUrl}/findbetween/${trainFrom}/${trainTo}`);
  }
}
