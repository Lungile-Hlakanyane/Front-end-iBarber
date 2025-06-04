import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessageDTO } from 'src/app/models/ChatMessageDTO';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8080/api/chats';

  constructor( private http: HttpClient) { }

  sendMessage(message: ChatMessageDTO): Observable<ChatMessageDTO> {
    return this.http.post<ChatMessageDTO>(`${this.baseUrl}/send`, message);
  }

  getChatMessages(senderId: number, receiverId: number): Observable<ChatMessageDTO[]> {
    return this.http.get<ChatMessageDTO[]>(`${this.baseUrl}/messages?senderId=${senderId}&receiverId=${receiverId}`);
  }

}
