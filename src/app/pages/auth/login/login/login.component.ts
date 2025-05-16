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

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private toastController: ToastController,
    private loginService:LoginService,
    private userService:RegisterService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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
  
    this.loginService.login(credentials).subscribe({
      next: async (response) => {
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
          next: (userData) => {
            localStorage.setItem('userId', userData.id);
            this.router.navigate(['/home']);
          },
          error: async (err) => {
            const toast = await this.toastController.create({
              message: 'Failed to fetch user ID',
              duration: 2000,
              color: 'warning',
              position: 'top'
            });
            await toast.present();
          }
        });
      },
      error: async (err) => {
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
  

  

}
