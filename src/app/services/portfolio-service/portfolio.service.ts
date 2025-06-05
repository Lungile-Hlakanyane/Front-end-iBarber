import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'http://localhost:8080/api/portfolios';

  constructor( private http: HttpClient ) { }

  uploadPortfolio(userId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    images.forEach((image, index) => {
      formData.append('images', image);
    });
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getUserPortfolio(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
  
}
