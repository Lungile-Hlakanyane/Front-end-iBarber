import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDTO } from 'src/app/models/PostDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = `${environment.apiBaseUrl}/posts`

  constructor(private http:HttpClient) { }

  createPost(post: PostDTO, imageFile?: File): Observable<PostDTO> {
    const formData = new FormData();
    formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.post<PostDTO>(this.apiUrl, formData);
  }

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<PostDTO> {
    return this.http.get<PostDTO>(`${this.apiUrl}/${id}`);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  likePost(postId: number, userId: number) {
    return this.http.post(`https://ibarber.duckdns.org/api/likes/${postId}/${userId}`, {});
  }
  
  unlikePost(postId: number, userId: number) {
    return this.http.delete(`https://ibarber.duckdns.org/api/likes/${postId}/${userId}`);
  }
  
  getLikes(postId: number) {
    return this.http.get<number>(`https://ibarber.duckdns.org/api/likes/count/${postId}`);
  }
  
  isPostLikedByUser(postId: number, userId: number) {
    return this.http.get<boolean>(`https://ibarber.duckdns.org/api/likes/${postId}/${userId}`);
  }

}
