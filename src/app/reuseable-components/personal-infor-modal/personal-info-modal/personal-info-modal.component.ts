import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController,ToastController,LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user-service-2/user.service';
import { UserDTO } from 'src/app/models/UserDTO';

@Component({
  selector: 'app-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PersonalInfoModalComponent  implements OnInit {
  @Input() userData: UserDTO = {
    id: 0,
    username: '',
    email: '',
    phoneNumber: ''
  };

  constructor(
    private modalController: ModalController,
    private userService:UserService,
    private toastController:ToastController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

  async dismissModal() {  
    this.modalController.dismiss();
  }

  async saveChanges() {
  if (!this.userData.id) return;

  const loading = await this.loadingController.create({
    message: 'Updating user...',
    spinner: 'circular'
  });

  await loading.present();

  this.userService.updateUser(this.userData.id, this.userData).subscribe({
    next: async (updatedUser) => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Profile updated successfully.',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.modalController.dismiss(updatedUser);
    },
    error: async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Failed to update profile.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
    });
  }


}
