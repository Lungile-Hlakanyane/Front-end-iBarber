import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserQuestionDTO } from 'src/app/models/UserQuestionDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private apiUrl = `${environment.apiBaseUrl}/questions`;

  constructor(private http:HttpClient) { }

  submitQuestion(question: UserQuestionDTO): Observable<any> {
    return this.http.post(this.apiUrl, question);
  }

  getAllQuestions(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

answerQuestion(id: number, answer: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/answer`, answer, {
    headers: { 'Content-Type': 'text/plain' }
  });
}

}
