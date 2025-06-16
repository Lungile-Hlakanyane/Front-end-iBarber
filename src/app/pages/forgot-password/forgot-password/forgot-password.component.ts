import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule, LoadingController, ToastController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router:Router
  ) { }

  ngOnInit() {}

  goBack(){
    this.navController.back();
  }

  async onSubmit() {
  const loading = await this.loadingController.create({
    message: 'Sending code...',
    spinner: 'circular'
  });
  await loading.present();

  // Simulated API call
  setTimeout(async () => {
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'A password reset link has been sent to your email.',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present().then(()=>{
      this.router.navigateByUrl('/forgot-password-otp')
    });

    this.forgotPasswordForm.reset();
  }, 2000);
}

}
