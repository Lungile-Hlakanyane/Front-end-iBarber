import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { IonicModule, IonInput } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { OtpService } from 'src/app/services/otp-service/otp.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OtpComponent  implements OnInit {
  @ViewChildren(IonInput) otpInputs!: QueryList<IonInput>;
  email: string = '';
  
  constructor(
    private router: Router,
    private otpService:OtpService,
    private toastController:ToastController,
    private route:ActivatedRoute,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  async verifyOtp() {
    const otpCode = this.otpInputs
      .map(input => input.value)
      .join('');

    if (otpCode.length !== 6) {
      const toast = await this.toastController.create({
        message: 'Please enter the full 6-digit OTP',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Verifying OTP...',
      spinner: 'circular',
    });
    await loading.present();

    this.otpService.verifyOtp({ otp: otpCode, email: this.email }).subscribe({
      
      next: async (response) => {
        console.log({ otp: otpCode, email: this.email });
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: response,
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Invalid OTP. Please try again.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }

  navigate(link:string){
    this.router.navigate([link]); 
  }

}
