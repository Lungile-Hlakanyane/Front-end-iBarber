import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterComponent  implements OnInit {

  constructor(
    private router: Router,
    private registerService:RegisterService,
    private loadingController: LoadingController,
    private toastController:ToastController
  ) { }

  user: User = {
    password:'',
    username:'',
    email: '',
    role: ''
  };

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]); 
  }

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registering user...',
      spinner: 'circular',
      duration: 3000,
    });
    await loading.present();
  
    this.registerService.registerUser(this.user).subscribe({
      next: async (response) => {
        await loading.dismiss();
  
        const toast = await this.toastController.create({
          message: 'You have successfully registered in the application...',
          duration: 3000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
  
        this.router.navigate(['/otp'], { queryParams: { email: this.user.email } });
      },
      error: async (err) => {
        console.error('Registration failed:', err);
        await loading.dismiss();
  
        const toast = await this.toastController.create({
          message: 'Registration failed. Please try again.',
          duration: 3000,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
  

}
