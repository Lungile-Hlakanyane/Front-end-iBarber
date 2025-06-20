import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

   private baseUrl = 'http://localhost:8080/api/report-user'; 

  constructor(private http: HttpClient) {}

  reportUser(data: ReportUserDTO): Observable<any> {
    return this.http.post(this.baseUrl, data, { responseType: 'text' as 'json' });
  }

  getAllReports(): Observable<ReportUserDTO[]> {
    return this.http.get<ReportUserDTO[]>(this.baseUrl);
  }

warnUser(reportId: number) {
  return this.http.put(`${this.baseUrl}/warn/${reportId}`, {}, { responseType: 'text' as 'json' });
}

banUser(reportId: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/ban/${reportId}`, {}, { responseType: 'text' as 'json' });
}

dismissReport(reportId: number) {
  return this.http.delete(`${this.baseUrl}/dismiss/${reportId}`);
}

getWarningsByUserId(userId: number): Observable<ReportUserDTO[]> {
  return this.http.get<ReportUserDTO[]>(`${this.baseUrl}/warnings/${userId}`);
}

countWarnings(userId: number) {
  return this.http.get<number>(`http://localhost:8080/api/report-user/warnings/count/${userId}`);
}

  
}
