import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiCallService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get headers() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
    return headers;
  }

  postAuthenticatedRequest(apiUrl, requestBody, paramHeaders?): Observable<any> {
    return this.httpClient.post<any>(apiUrl, requestBody, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  putAuthenticatedRequest(apiUrl, requestBody, paramHeaders?) {
    return this.httpClient.put<any>(apiUrl, requestBody, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAuthenticatedRequest(apiUrl, paramHeaders?): Observable<any> {
    return this.httpClient.get<any>(apiUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  postRequest(apiUrl, requestBody, paramHeaders?): Observable<any> {
    return this.httpClient.post<any>(apiUrl, requestBody)
      .pipe(
        catchError(this.handleError)
      );
  }

  putRequest(apiUrl, requestBody, paramHeaders?) {
    return this.httpClient.put<any>(apiUrl, requestBody)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRequest(apiUrl, paramHeaders?): Observable<any> {
    return this.httpClient.get<any>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // postRequestWithBlob(apiUrl, requestBody, type): Observable<any> {
  //   return this.httpClient.post(apiUrl, requestBody, { headers: this.headers, responseType: 'blob' })
  //     .pipe(
  //       map(res => new Blob([res], { type })),
  //       catchError(this.handleError)
  //     );
  // }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // console.log(errorMessage);
    }
    return throwError(errorMessage);
  }
}
