import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { SlotDTO } from 'src/app/models/SlotDTO';
import { SlotService } from 'src/app/services/slot-service/slot.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/services/user-service/register.service';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule]
})
export class CreateSlotComponent  implements OnInit {
  slotForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private toastController: ToastController, 
    private loadingController: LoadingController,
    private router: Router,
    private slotService:SlotService,
    private registerService:RegisterService
  ) {
  }

  ngOnInit() {
    this.slotForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  navigate(link: string) {
    this.router.navigate([link]); 
  }

  async submitSlot() {
    if (this.slotForm.invalid) {
      const errorToast = await this.toastController.create({
        message: 'Please fill all required fields!',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
      return;
    }
  
    const loading = await this.loadingController.create({
      message: 'Creating slot...',
      spinner: 'circular'
    });
    await loading.present();
  
    const email = localStorage.getItem('userEmail');
    if (!email) {
      await loading.dismiss();
      const errorToast = await this.toastController.create({
        message: 'User email not found in local storage.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
      return;
    }
  
    this.registerService.getUserByEmail(email).subscribe({
      next: async (userData) => {
        const barberId = userData.id;
  
        const formValues = this.slotForm.value;
        const slotDTO: SlotDTO = {
          date: formValues.date.split('T')[0],
          startTime: formValues.startTime.split('T')[1],
          endTime: formValues.endTime.split('T')[1],
          barberId
        };
  
        this.slotService.createSlot(slotDTO).subscribe({
          next: async () => {
            await loading.dismiss();
            const successToast = await this.toastController.create({
              message: 'You have successfully created a slot',
              duration: 2000,
              color: 'success',
              position: 'top',
            });
            await successToast.present();
            this.slotForm.reset();
            this.router.navigate(['/barber-bookings']);
          },
          error: async (err) => {
            await loading.dismiss();
            const errorToast = await this.toastController.create({
              message: 'Failed to create slot. Try again.',
              duration: 2000,
              color: 'danger',
              position: 'top'
            });
            await errorToast.present();
            console.error('Slot creation error:', err);
          }
        });
      },
      error: async (err) => {
        await loading.dismiss();
        const errorToast = await this.toastController.create({
          message: 'Failed to retrieve user info.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await errorToast.present();
        console.error('Get user error:', err);
      }
    });
  }
  
}
