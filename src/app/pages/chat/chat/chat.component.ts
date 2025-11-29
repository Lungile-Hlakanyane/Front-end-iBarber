import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule,ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { ChatMessageDTO } from 'src/app/models/ChatMessageDTO';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/user-service/register.service';
import * as SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import { Announcement } from 'src/app/models/Announcement';
import { BroadcastServiceService } from 'src/app/services/broadcast-announcement-service/broadcast-service.service';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';
import { ReportUserService } from 'src/app/services/report-user-service/report-user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatComponent  implements OnInit, OnDestroy {

  warnings: ReportUserDTO[] = [];
  isReceiverOnline: boolean = false;
  isOnline: boolean = navigator.onLine;
  stompClient!: Client;
  messages: ChatMessageDTO[] = [];
  messageText: string = '';
  receiverUser?: User;
  announcements: Announcement[] = [];
  currentUser?: User;
  senderId!: number;
  receiverId!: number;

  constructor(
    private router: Router,
    private http:HttpClient,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private actionSheetController: ActionSheetController,
    private broadcastService: BroadcastServiceService,
    private reportUserService: ReportUserService
  ) { }

  
ngOnInit() {
  const storedId = localStorage.getItem('userId');
  this.senderId = storedId ? Number(storedId) : 0;
  this.registerService.getUserById(this.senderId).subscribe({
    next: (user) => {
      this.currentUser = user;
      this.loadAnnouncements();
    },
    error: (err) => console.error('Failed to load current user:', err),
  });
  this.route.paramMap.subscribe(params => {
    const receiver = params.get('receiverId');
    this.receiverId = receiver ? Number(receiver) : 0;
    this.loadChatMessages();
    this.loadReceiverDetails();
  });
  this.connectToWebSocket();
  //online user status
  window.addEventListener('online', () => this.updateOnlineStatus(true));
  window.addEventListener('offline', () => this.updateOnlineStatus(false));
}


updateOnlineStatus(status: boolean) {
  this.isOnline = status;
}

ngOnDestroy(): void {
  window.removeEventListener('online', () => this.updateOnlineStatus(true));
  window.removeEventListener('offline', () => this.updateOnlineStatus(false));
}

navigate(link:string) {
    this.router.navigate([link]); 
}

loadChatMessages() {
    this.chatService.getChatMessages(this.senderId, this.receiverId).subscribe({
      next: (data) => (this.messages = data),
      error: (err) => console.error('Failed to load messages:', err),
    });
  }

  sendMessage() {
    const trimmed = this.messageText.trim();
    if (!trimmed) return;
    const newMessage: ChatMessageDTO = {
      senderId: this.senderId,
      receiverId: this.receiverId,
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(newMessage),
    });
    this.messages.push(newMessage);
    this.messageText = '';
  }

 loadReceiverDetails() {
  this.registerService.getUserById(this.receiverId).subscribe({
    next: (data) => {
      this.receiverUser = data;
      this.isReceiverOnline = data.onlineStatus;
    },
    error: (err) => console.error('Failed to load receiver user:', err),
  });
}

  connectToWebSocket() {
  this.stompClient = new Client({
    brokerURL: 'https://ibarber.duckdns.org/ws',
    webSocketFactory: () => new SockJS('https://ibarber.duckdns.org/ws'),
    connectHeaders: {
      userId: this.senderId.toString()
    },
    reconnectDelay: 5000,
    onConnect: () => {
      this.stompClient.subscribe(`/topic/messages/${this.senderId}`, (message: Message) => {
        const chatMessage = JSON.parse(message.body);
        this.messages.push(chatMessage);
      });
      this.stompClient.subscribe('/topic/online-status', (message: Message) => {
        const onlineUsers: number[] = JSON.parse(message.body);
        this.isReceiverOnline = onlineUsers.includes(this.receiverId);
      });
    }
  });
  this.stompClient.activate();
}


  async openOptions(message: ChatMessageDTO) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Message Options',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.deleteMessage(message);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
  
    await actionSheet.present();
  }

deleteMessage(message: ChatMessageDTO) {
  if (!message.id) return;
  this.chatService.deleteMessage(message.id).subscribe({
    next: () => {
      this.messages = this.messages.filter(m => m.id !== message.id);
    },
    error: (err) => {
      console.error('Failed to delete message:', err);
    }
  });
}


async loadAnnouncements() {
  if (!this.currentUser) return;
  this.broadcastService.getAllAnnouncements().subscribe({
    next: (data) => {
      this.announcements = data.filter(a =>
        a.targetGroup === 'all' ||
        (a.targetGroup === 'barbers' && this.currentUser?.role === 'barber') ||
        (a.targetGroup === 'customers' && this.currentUser?.role === 'client')
      );
    },
    error: (err) => console.error('Failed to load announcements:', err),
  });
}

async loadWarnings(userId: number) {
  this.reportUserService.getWarningsByUserId(userId).subscribe({
    next: (data) => {
      this.warnings = data;
    },
    error: (err) => console.error('Failed to load warnings:', err),
  });
}

    
}
