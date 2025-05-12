import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
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
    const email = this.email.value.toLowerCase();
    if (email === 'admin@ibarber.co.za') {
      this.role = 'admin';
    } else if (email === 'barber@ibarber.co.za') {
      this.role = 'barber';
    } else {
      this.role = 'client';
    }
  
    localStorage.setItem('userRole', this.role);
  
    const toast = await this.toastController.create({
      message: `Logged in as ${this.role}`,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
    this.router.navigate(['/home']);
  }
  

}
