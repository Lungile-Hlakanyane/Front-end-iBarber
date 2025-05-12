import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ImagePreviewModalComponent } from 'src/app/reuseable-components/image-preview-modal/image-preview-modal/image-preview-modal.component';

@Component({
  selector: 'app-view-barber-profile',
  templateUrl: './view-barber-profile.component.html',
  styleUrls: ['./view-barber-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ViewBarberProfileComponent  implements OnInit {
  @Input() imageScr!: string;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  barber = {
    name: 'Lungile Hlakanyane',
    email: 'lungilehlakasgmail.com',
    imageUrl: 'assets/cuts/skinfade.jpg',
    experience: 5,
    specialty: 'Fade',
    rating: 4.7,
    portfolio: [
      'assets/barbers/jay.jpg',
      'assets/barbers/king.jpg',
      'assets/barbers/mel.jpg',
      'assets/barbers/jay.jpg',
      'assets/barbers/king.jpg',
      'assets/barbers/mel.jpg',
      'assets/cuts/skinfade.jpg',
      'assets/cuts/fade1.jpg',
      'assets/cuts/taper.jpg',
    ]
  };

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]);
  }

  close(){
    this.modalController.dismiss();
  }

  async openImagePreview(image: string) {
    const modal = await this.modalController.create({
      component: ImagePreviewModalComponent,
      componentProps: {
        imageSrc: image
      },
      cssClass: 'image-modal'
    });
    await modal.present();
  }

}
