import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewPasswordComponent  implements OnInit {
  resetForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navController:NavController,
    private router:Router
  ) { 
      this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  goBack(){
    this.navController.back();
  }

   togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit() {
    if (this.resetForm.invalid) return;

    const { newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Passwords do not match!',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Resetting password...',
      spinner: 'circular'
    });

    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Your password has been reset successfully!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present().then(()=>{
        this.router.navigateByUrl('/login');
      });
      this.resetForm.reset();
    }, 2000);
  }


}
