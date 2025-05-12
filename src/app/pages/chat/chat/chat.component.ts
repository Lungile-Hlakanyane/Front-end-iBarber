import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatComponent  implements OnInit {

  messages = [
    { from: 'me', text: 'Hey, how are you?' },
    { from: 'other', text: 'I am great, thank you!' },
  ];

  messageText: string = '';

  sendMessage() {
    if (this.messageText.trim() !== '') {
      this.messages.push({ from: 'me', text: this.messageText });
      this.messageText = '';
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(link:string) {
    this.router.navigate([link]); 
  }

}
