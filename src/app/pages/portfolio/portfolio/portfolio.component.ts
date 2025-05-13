import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewPortfolioImageComponent } from 'src/app/reuseable-components/view-porfolio-image/view-portfolio-image/view-portfolio-image.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PortfolioComponent  implements OnInit {
  currentTab: string = 'images'; 
  images: string[] = [];
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  triggerImageUpload() {
    this.fileInput.nativeElement.click();
  }

  portfolioImages: string[] = [
    'assets/barbers/jay.jpg',
    'assets/barbers/king.jpg',
    'assets/barbers/mel.jpg',
    'assets/barbers/jay.jpg',
    'assets/barbers/king.jpg',
    'assets/barbers/mel.jpg',
    'assets/cuts/skinfade.jpg',
    'assets/cuts/fade1.jpg',
    'assets/cuts/taper.jpg',
  ];

  portfolioVideos: string[] = [
    
  ];

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(
    private router: Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  async openImageViewer(image: string) {
    const modal = await this.modalController.create({
      component:ViewPortfolioImageComponent,
      componentProps: { imageSrc: image },
      cssClass: 'view-portfolio-modal'
    });
    return await modal.present();
  }

}
