import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessageDTO } from 'src/app/models/ChatMessageDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = `${environment.apiBaseUrl}/chats`;

  constructor( private http: HttpClient) { }

  sendMessage(message: ChatMessageDTO): Observable<ChatMessageDTO> {
    return this.http.post<ChatMessageDTO>(`${this.apiUrl}/send`, message);
  }

  getChatMessages(senderId: number, receiverId: number): Observable<ChatMessageDTO[]> {
    return this.http.get<ChatMessageDTO[]>(`${this.apiUrl}/messages?senderId=${senderId}&receiverId=${receiverId}`);
  }

  deleteMessage(id:number):Observable<any>{
     return this.http.delete(`http://16.171.33.44:8080/api/chats/delete/${id}`, {
      responseType: 'text',
   });
  }

}
