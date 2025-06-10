import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewPortfolioImageComponent } from 'src/app/reuseable-components/view-porfolio-image/view-portfolio-image/view-portfolio-image.component';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { User } from 'src/app/models/User';
import { PortfolioService } from 'src/app/services/portfolio-service/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class PortfolioComponent  implements OnInit {
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;
  currentTab: string = 'images'; 
  images: string[] = [];
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  userDetails: User | null = null; 

  triggerImageUpload() {
    this.fileInput.nativeElement.click();
  }

  portfolioImages: string[] = [
   
  ];

  uploadedFiles: File[] = [];

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
    private modalController:ModalController,
    private registerService: RegisterService,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this.fetchUserDetails();
  }

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


async fetchUserDetails() {
  const email = localStorage.getItem('userEmail');
  if (email) {
    this.registerService.getUserByEmail(email).subscribe({
      next: (data) => {
        this.userDetails = data;
        // ✅ Fetch portfolio images only after userDetails is available
        if (this.userDetails && this.userDetails.id !== undefined && this.userDetails.id !== null) {
          this.fetchPortfolioImages(this.userDetails.id);
        }
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }
}

  uploadImages(): void {
    this.imageInput.nativeElement.click();
  }

  handleMultipleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.uploadedFiles.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  uploadToServer(): void {
    if (!this.userDetails || !this.uploadedFiles.length) return;
  
    this.portfolioService.uploadPortfolio(this.userDetails.id!, this.uploadedFiles).subscribe({
      next: response => {
        console.log('Upload success:', response);
        this.uploadedFiles = [];
      },
      error: error => {
        console.error('Upload error:', error);
      }
    });
  }
  

fetchPortfolioImages(userId: number): void {
  this.portfolioService.getPortfolioImagesByUserId(userId).subscribe({
    next: (images) => {
      this.portfolioImages = images.map(img => { const filename = img.split('\\').pop()?.split('/').pop(); // handles Windows or Unix paths
        return `http://localhost:8080/portfolios-images/${filename}`;
      });
    },
    error: (err) => {
      console.error('Error fetching portfolio images:', err);
    }
  });
 }
  
}
