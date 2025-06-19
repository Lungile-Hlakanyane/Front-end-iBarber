import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-premium-subscription',
  templateUrl: './premium-subscription.component.html',
  styleUrls: ['./premium-subscription.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]  
})
export class PremiumSubscriptionComponent  implements OnInit {

  isSubscribed: boolean = false;

  constructor(
    private toastController:ToastController,
    private navController:NavController
  ) { }

  ngOnInit() {}

   async subscribe() {
    this.isSubscribed = true;

    const toast = await this.toastController.create({
      message: 'Subscribed successfully!',
      duration: 3000,
      color: 'success',
      position: 'top',
    });
    await toast.present();

    this.navController.navigateBack('/home');
  }

  navigate(path: string) {
    this.navController.navigateForward(path);
  }


}
