import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  private apiUrl = `${environment.apiBaseUrl}/report-user`;

  constructor(private http: HttpClient) {}

  reportUser(data: ReportUserDTO): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' as 'json' });
  }

  getAllReports(): Observable<ReportUserDTO[]> {
    return this.http.get<ReportUserDTO[]>(this.apiUrl);
  }

warnUser(reportId: number) {
  return this.http.put(`${this.apiUrl}/warn/${reportId}`, {}, { responseType: 'text' as 'json' });
}

banUser(reportId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/ban/${reportId}`, {}, { responseType: 'text' as 'json' });
}

dismissReport(reportId: number) {
  return this.http.delete(`${this.apiUrl}/dismiss/${reportId}`);
}

getWarningsByUserId(userId: number): Observable<ReportUserDTO[]> {
  return this.http.get<ReportUserDTO[]>(`${this.apiUrl}/warnings/${userId}`);
}

countWarnings(userId: number) {
  return this.http.get<number>(`https://ibarber.duckdns.org/api/report-user/warnings/count/${userId}`);
}
  
}
