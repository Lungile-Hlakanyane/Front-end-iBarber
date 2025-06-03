import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post-service/post.service';
import { PostDTO } from 'src/app/models/PostDTO';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePostComponent  implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  postText = '';
  selectedAudience = 'anyone';
  selectedImage?: File; 

  constructor(
    private router: Router,
    private postService:PostService,
    private loadingController:LoadingController,
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  triggerImageSelection() {
    this.fileInput.nativeElement.click();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  async submitPost() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      const toast = await this.toastController.create({
        message: 'User not logged in.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    const post: PostDTO = {
      content: this.postText,
      audience: this.selectedAudience,
      userId: userId
    };

    const loading = await this.loadingController.create({
      message: 'Posting...'
    });
    await loading.present();

    this.postService.createPost(post, this.selectedImage).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Post created successfully.',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/home']);
      },
      error: async (error) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error creating post.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
        console.error('Error creating post:', error);
      }
    });
  }

  
}
