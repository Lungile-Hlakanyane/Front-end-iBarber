import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RateModalComponent } from 'src/app/reuseable-components/rate-a-barber/rate-modal/rate-modal.component';
import { ModalController } from '@ionic/angular';
import { ImagePreviewModalComponent } from 'src/app/reuseable-components/image-preview-modal/image-preview-modal/image-preview-modal.component';
import { ReportUserModalComponent } from 'src/app/reuseable-components/report-user-modal/report-user-modal/report-user-modal.component';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { PortfolioService } from 'src/app/services/portfolio-service/portfolio.service';
import { User } from 'src/app/models/User';
import { ViewPortfolioImageComponent } from 'src/app/reuseable-components/view-porfolio-image/view-portfolio-image/view-portfolio-image.component';
import { RateService } from 'src/app/services/rate-service/rate.service';
import { SlotService } from 'src/app/services/slot-service/slot.service';

@Component({
  selector: 'app-view-barber-profile',
  templateUrl: './view-barber-profile.component.html',
  styleUrls: ['./view-barber-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ViewBarberProfileComponent  implements OnInit {
  @Input() imageScr!: string;
  bookingCount: number = 0;
  userDetails: User | null = null; 
  clientCount: number = 0;
  portfolioImages: string[] = [
   
  ];

  constructor(
    private router: Router,
    private modalController: ModalController,
    private route:ActivatedRoute,
    private registerService:RegisterService,
    private portfolioService:PortfolioService,
    private rateService:RateService,
    private slotService:SlotService
  ) { }

   barber: any = {};

  ngOnInit() {
    const barberId = this.route.snapshot.paramMap.get('id');
    if (barberId) {
      const id = +barberId;
      this.fetchBarberById(+barberId);
      this.fetchPortfolioImages(+barberId); 
      this.getAverageRating(id);
      this.getBookingCount(id);
      this.getClientCount(id);
    }    
  }

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

 async openRateModal() {
  const userId = +localStorage.getItem('userId')!;
  const barberId = +this.route.snapshot.paramMap.get('id')!;
  const modal = await this.modalController.create({
    component: RateModalComponent,
    cssClass: 'rate-modal',
    componentProps: {
      userId,
      barberId
    }
  });
  modal.onDidDismiss().then((result) => {
    if (result.data !== null) {
      console.log('User rated:', result.data);
    }
  });
  await modal.present();
}

  async openReportModal() {
    const modal = await this.modalController.create({
      component: ReportUserModalComponent,
      cssClass: 'report-modal',
    });
    modal.onDidDismiss().then((result) => {
      if (result.data !== null) {
        console.log('User rated:', result.data);
      }
    });
    await modal.present();
  }

 fetchBarberById(id: number) {
  this.registerService.getUserById(id).subscribe({
    next: (data) => {
      this.barber = {
        name: data.username,
        email: data.email,
        profileImage: data.profileImageUrl || null,
        experience: data.experience || 0,
        specialty: data.specialty || 'N/A',
        rating: data.rating || 0,
      };
    },
    error: (err) => {
      console.error('Failed to fetch barber:', err);
    }
  });
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

fetchPortfolioImages(userId: number): void {
  this.portfolioService.getPortfolioImagesByUserId(userId).subscribe({
    next: (images) => {
      this.portfolioImages = images.map(img => { const filename = img.split('\\').pop()?.split('/').pop(); 
        return `http://localhost:8080/portfolios-images/${filename}`;
      });
    },
    error: (err) => {
      console.error('Error fetching portfolio images:', err);
    }
  });
 }

async openImageViewer(image: string) {
    const modal = await this.modalController.create({
       component:ViewPortfolioImageComponent,
       componentProps: { imageSrc: image },
       cssClass: 'view-portfolio-modal'
     });
    return await modal.present();
}

getAverageRating(barberId: number): void {
  this.rateService.getAverageRating(barberId).subscribe({
    next: (average: number) => {
      this.barber.rating = average;
    },
    error: (err) => {
      console.error('Failed to fetch average rating:', err);
      this.barber.rating = 0;
    }
  });
}

getBookingCount(barberId: number): void {
  this.slotService.getBookingCountByBarber(barberId).subscribe({
    next: (count) => {
      this.bookingCount = count;
    },
    error: (err) => {
      console.error('Failed to fetch booking count:', err);
      this.bookingCount = 0;
    }
  });
}

getClientCount(barberId: number): void {
  this.slotService.getClientCountByBarber(barberId).subscribe({
    next: (count) => {
      this.clientCount = count;
    },
    error: (err) => {
      console.error('Failed to fetch client count:', err);
      this.clientCount = 0;
    }
  });
}

 

}
