import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';

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
    private toastCtrl: ToastController, 
    private router: Router) {
   
  }

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]); 
  }

  async submitSlot() {
    const slotData = this.slotForm.value;
    console.log('Slot created:', slotData);
  
    const loading = await this.toastCtrl.create({
      message: 'Creating slot...',
      duration: 2000,
      position: 'middle',
      translucent: true,
    });
  
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const successToast = await this.toastCtrl.create({
        message: 'You have successfully created a slot',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      await successToast.present();
      this.slotForm.reset();
    }, 2000); 
  }
  

}
