import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { RatingDTO } from 'src/app/models/RatingDTO';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class RateModalComponent  implements OnInit {
  @Input() userId!: number;
  @Input() barberId!: number;

  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private ratingService:RateService
  ) {}

  ngOnInit(){
   
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
  }

async submitRating() {
  const loading = await this.loadingController.create({
    message: 'Submitting Rating...',
    spinner: 'circular',
  });

  await loading.present();

  const rating: RatingDTO = {
    userId: this.userId,
    barberId: this.barberId,
    stars: this.selectedRating
  };

  this.ratingService.rateBarber(rating).subscribe({
    next: async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Rating submitted successfully!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      await this.modalController.dismiss(this.selectedRating);
    },
    error: async (err) => {
      console.error('Error rating barber:', err);
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Error submitting rating.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}
  
  async dismiss() {
    await this.modalController.dismiss(null);
  }
}
