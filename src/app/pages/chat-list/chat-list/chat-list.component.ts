import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatListComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]);
  }

  chatList = [
    {
      name: 'Melanie Smith',
      avatar: 'assets/profile-pic-image.jpg',
      lastMessage: 'Looking forward to hearing from you...',
      time: '10/22/24'
    },
    {
      name: 'Beast Team',
      avatar: 'assets/profile-pic-image.jpg',
      lastMessage: 'Have a good day, Maisy!',
      time: '7:32 AM'
    },
    {
      name: 'Charlotte de Witte',
      avatar: 'assets/profile-pic-image.jpg',
      lastMessage: 'no problem',
      time: 'Saturday'
    }
  ];

}
