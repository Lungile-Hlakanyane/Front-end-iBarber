import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login-service/login.service';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]  
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;
  role: string = '';
  showPassword = false;

  sentences: string[] = [
    "With iBarber, clients can discover skilled barbers.",
    "Book sharp fades and clean cuts.",
    "Stay fresh with the latest grooming trends.",
    "Your style, your schedule — anytime, anywhere."
  ];
  
  currentIndex = 0;
  intervalId: any;

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private toastController: ToastController,
    private loginService:LoginService,
    private userService:RegisterService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.startTextAnimation();
  }

  navigate(link:string){
    this.router.navigate([link]);
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  async onLogin() {
    if (this.loginForm.invalid) return;
  
    const credentials = this.loginForm.value;
  
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      spinner: 'circular', 
      duration: 0, 
      backdropDismiss: true
    });
    await loading.present();
  
    this.loginService.login(credentials).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: response.message || 'Login successful',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
  
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('userRole', response.role);
  
        this.userService.getUserByEmail(response.email).subscribe({
          next: async (userData) => {
            localStorage.setItem('userId', userData.id);
            await this.router.navigate(['/home']);
          },
          error: async (err) => {
          await loading.dismiss();
          const errorMessage = err.error.message || 'Invalid credentials';
          const toast = await this.toastController.create({
          message: errorMessage,
          duration: 3000,
          color: errorMessage.includes('banned') ? 'warning' : 'danger',
          position: 'top'
       });
         await toast.present();
        }
        });
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: err.error.message || 'Invalid credentials',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  startTextAnimation() {
    const textElement = document.getElementById('animated-text');
    if (!textElement) return;
  
    const showSentence = () => {
      textElement.classList.remove('show');
      setTimeout(() => {
        textElement.textContent = this.sentences[this.currentIndex];
        textElement.classList.add('show');
      }, 500); // Wait 500ms before fading in new text
    };
  
    showSentence(); // Initial show
  
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.sentences.length;
      showSentence();
    }, 4000); // Total duration per sentence
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  
  
}
