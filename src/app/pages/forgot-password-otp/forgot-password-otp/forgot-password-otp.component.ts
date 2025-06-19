import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, IonInput, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password-service/forgot-password.service';
import { OtpService } from 'src/app/services/otp-service/otp.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordOtpComponent  implements OnInit {
  @ViewChildren('input') inputs!: QueryList<IonInput>;
  email: any | null = null;

  constructor(
    private toastController:ToastController,
    private route:ActivatedRoute,
    private loadingController:LoadingController,
    private navController:NavController,
    private router:Router,
    private forgotPasswordService:ForgotPasswordService,
    private otpService:OtpService
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.email = nav?.extras?.state?.['email'] || null;
    console.log('Received email:', this.email);
  }

  goBack(){
    this.navController.back();
  }

  async verifyOtp(path: string) {
    const otp = this.inputs.map(input => (input.value as string || '').trim()).join('');

    if (otp.length !== 6) {
      const toast = await this.toastController.create({
        message: 'Please enter all 6 digits of the OTP',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      return toast.present();
    }

    this.otpService.verifyOtp({ email: this.email, otp }).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'OTP verified successfully!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigateByUrl(path);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Invalid or expired OTP. Please try again.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    }); 
 }
}
