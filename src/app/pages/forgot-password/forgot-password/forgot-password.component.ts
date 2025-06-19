import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule, LoadingController, ToastController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password-service/forgot-password.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]  
})
export class ForgotPasswordComponent  implements OnInit {
  submitted: any;
  email: any;
  forgotPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController:NavController,
    private router:Router,
    private forgotPasswordService:ForgotPasswordService
  ) { }

  user: User = {
    password:'',
    username:'',
    email: '',
    role: ''
  };
  
  ngOnInit() {}

  goBack(){
    this.navController.back();
  }

async onSubmit() {
  if (!this.email || this.email.trim() === '') {
    const errorToast = await this.toastController.create({
      message: 'Please enter a valid email.',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    return errorToast.present();
  }

  const loading = await this.loadingController.create({
    message: 'Sending reset link...',
    spinner: 'circular'
  });
  await loading.present();

  this.forgotPasswordService.sendForgotPasswordRequest(this.email).subscribe({
    next: async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'A password reset link has been sent to your email.',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();

      // ✅ DO NOT NAVIGATE TO OTP SCREEN
      // Optionally, you can navigate to a confirmation screen or just stay here.
    },
    error: async (err) => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: err.error || 'Failed to send reset link. Please try again.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}


}
