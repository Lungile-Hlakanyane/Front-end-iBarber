import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO } from 'src/app/models/Comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiBaseUrl}/comments`;

  constructor( private http: HttpClient ) { }

  addComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.apiUrl, comment);
  }

  getCommentsByPostId(postId: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/post/${postId}`);
  }
}
