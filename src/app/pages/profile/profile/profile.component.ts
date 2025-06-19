import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController,ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PersonalInfoModalComponent } from 'src/app/reuseable-components/personal-infor-modal/personal-info-modal/personal-info-modal.component';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { ReportUserService } from '../../../services/report-user-service/report-user.service';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';
import { ProfileImageService } from 'src/app/services/profile-image-service/profile-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfileComponent  implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  defaultImage = '../../../../assets/profile-pic-image.jpg';
  selectedImage: string | ArrayBuffer | null = null;

  role: string = '';
  user: any;
  warnings: ReportUserDTO[] = [];

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private userService:RegisterService,
    private reportUserService: ReportUserService,
    private profileImageService:ProfileImageService
  ) { }

  ngOnInit() {
    const storedId = localStorage.getItem('userId');
    if (storedId !== null) {
      const userId = Number(storedId);
      if (!isNaN(userId)) {
        this.loadWarnings(userId);
      }
    }
    
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.role = storedRole;
    }
    const email = localStorage.getItem('userEmail');
    if (email) {
     this.userService.getUserByEmail(email).subscribe({
  next: (res) => {
    this.user = res;
    console.log('Fetched user:', this.user);

    if (this.user.profileImage) {
      this.loadProfileImageFromServer(this.user.profileImage);
    }
  },
  error: (err) => {
    console.error('Failed to fetch user:', err);
  }
});

    }

   
  }

  navigate(link:string){
    this.router.navigate([link]); 
  }

  async openNotificationSettings() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Notification Settings',
      cssClass: 'notification-action-sheet',
      buttons: [
        {
          text: 'Turn on Notifications',
          role: 'toggle',
          handler: () => {
           this.turnOnNotifications();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  async turnOnNotifications() {
    const loading = await this.loadingController.create({
      message: 'Turning on notifications...',
      duration: 2000
    });
    await loading.present();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const toast = await this.toastController.create({
      message: 'You have successfully turned on notifications...',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  async openEditUserModal() {
    const modal = await this.modalController.create({
      component: PersonalInfoModalComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {
        userData: {
          username: 'JohnDoe',
          email: 'john@example.com',
          password: '********'
        }
      }
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Updated user data:', result.data);
        // Save it to API or state
      }
    });
    await modal.present();
  }

async loadWarnings(userId: number) {
  this.reportUserService.getWarningsByUserId(userId).subscribe({
    next: (data) => {
      this.warnings = data;
    },
    error: (err) => console.error('Failed to load warnings:', err),
  });
}

async openImageOptions() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Profile Image Options',
    buttons: [
      {
        text: 'Upload Profile Image',
        icon: 'cloud-upload-outline',
        handler: () => {
          this.uploadProfileImage();
        }
      },
      {
        text: 'Delete Image',
        handler: ()=>{
          this.deleteImage();
        },
        icon: 'trash-outline',
      },
    ]
  });

  await actionSheet.present();
}

deleteImage(){
    
}

uploadProfileImage() {
    this.fileInput.nativeElement.click(); 
}

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
   if (this.user?.id) {
  this.profileImageService.uploadProfileImage(this.user.id, file).subscribe({
    next: (res) => {
      this.toastController.create({
        message: res, // This will now be "Profile image uploaded successfully."
        duration: 2000,
        color: 'success',
        position: 'top'
      }).then(toast => toast.present());
    },
    error: (err) => {
      console.error('Upload error:', err);
      this.toastController.create({
        message: 'Failed to upload image.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      }).then(toast => toast.present());
    }
   });
  }
 }
}

loadProfileImageFromServer(filename: string) {
  this.profileImageService.getProfileImage(filename).subscribe({
    next: (blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(blob);
    },
    error: (err) => {
      console.error('Failed to load profile image:', err);
    }
  });
}


}
