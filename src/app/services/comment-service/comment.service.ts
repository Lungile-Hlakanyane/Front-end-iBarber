import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/comments';

  constructor( private http: HttpClient ) { }

  addComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.baseUrl, comment);
  }

  getCommentsByPostId(postId: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.baseUrl}/post/${postId}`);
  }
}
