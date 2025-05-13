import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AdminViewUserComponent  implements OnInit {
  user: any = {
    fullName: 'Lungile Hlakanyane',
    username: 'lungilehlaka',
    email: 'lungilehlakas@gmail.com',
    phoneNumber: '073 456 7890',
    role: 'barber',
    avatarUrl: 'assets/profile-pic-image.jpg' // You can later replace this with dynamic loading
  };

  finance = {
    weekly: 1250.00,
    monthly: 5300.50,
    yearly: 67250.99
  };

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
