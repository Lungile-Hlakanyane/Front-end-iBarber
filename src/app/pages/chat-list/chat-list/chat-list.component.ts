import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/user-service/register.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatListComponent  implements OnInit {

  chatList: User[] = [];
  filteredChatList: User[] = [];
  searchTerm: string = '';
  currentUserId: number | null = null;

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

   loadUsers() {
    this.registerService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.chatList = users.filter(user => user.id !== this.currentUserId);
        this.filteredChatList = [...this.chatList]; // Initialize filtered list
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }

  async loadAllUsers() {
    const storedUserId = localStorage.getItem('userId');
    this.currentUserId = storedUserId ? Number(storedUserId) : null;
    if (this.currentUserId !== null) {
      this.loadUsers();
    }
  }

  navigateToChat(receiver: User) {
    this.router.navigate(['/chat', receiver.id]);
  }

  filterChats() {
    const term = this.searchTerm.toLowerCase();
    this.filteredChatList = this.chatList.filter(chat =>
      chat.username.toLowerCase().includes(term) ||
      chat.email.toLowerCase().includes(term) ||
      chat.role.toLowerCase().includes(term)
    );
  }

}
