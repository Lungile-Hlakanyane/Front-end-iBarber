import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatingDTO } from 'src/app/models/RatingDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private apiUrl = `${environment.apiBaseUrl}/ratings`;

  constructor(private http:HttpClient) { }

  rateBarber(rating: RatingDTO): Observable<RatingDTO> {
    return this.http.post<RatingDTO>(this.apiUrl, rating);
  }

  getRatingsForBarber(barberId: number): Observable<RatingDTO[]> {
    return this.http.get<RatingDTO[]>(`${this.apiUrl}/barber/${barberId}`);
  }

 getAverageRating(barberId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/average/${barberId}`);
 }
 
}
