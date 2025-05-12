import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateSlotComponent  implements OnInit {
  slotForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private toastController: ToastController, 
    private loadingController: LoadingController,
    private router: Router) {
  }

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]); 
  }

  async submitSlot() {
    const loading = await this.loadingController.create({
      message: 'Creating slot...',
      spinner: 'circular',
      duration: 2000
    });
  
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const successToast = await this.toastController.create({
        message: 'You have successfully created a slot',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      await successToast.present().then(()=>{
        this.router.navigate(['/barber-bookings']);
      });
      this.slotForm.reset();
    }, 2000);
  }
  
}
