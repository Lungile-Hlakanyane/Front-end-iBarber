import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/reuseable-components/side-menu/side-menu.component';
import { ModalController } from '@ionic/angular';
import { PostDTO } from 'src/app/models/PostDTO';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class FeedComponent  implements OnInit {

    showSearchBar = false;
    searchText = '';
    userDetails: any;
    posts:PostDTO[] = [];
    showComments: boolean = false;
  
    constructor(
      private router: Router,
      private modalController: ModalController,
      private userService:RegisterService,
      private postService:PostService,
      private commentService:CommentService,
      private toastController:ToastController,
      private alertController:AlertController,
      private loadingController:LoadingController
    ) { }
  
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    }
  
    ngOnInit() {
      const email = localStorage.getItem('userEmail');
      if (email) {
        this.userService.getUserByEmail(email).subscribe({
          next: (user) => {
            this.userDetails = user;
            console.log('Logged-in user details:', this.userDetails);
          },
          error: (err) => {
            console.error('Failed to fetch user:', err);
          }
        });
      }
      this.loadPosts();
  }
  
  loadPosts() {
      this.postService.getAllPosts().subscribe({
        next: (data) => {
          this.posts = data;
          this.posts.forEach(post => {
            this.userService.getUserById(post.userId).subscribe({
              next: (user) => post.username = user.username,
              error: () => post.username = 'Unknown'
            });
            this.postService.getLikes(post.id).subscribe({
              next: (count) => post.likesCount = count,
              error: () => post.likesCount = 0
            });
            this.postService.isPostLikedByUser(post.id, this.userDetails.id).subscribe({
              next: (liked) => post.likedByCurrentUser = liked,
              error: () => post.likedByCurrentUser = false
            });
          });
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        },
      });
  }
    
  
  navigate(link:string){
      this.router.navigate([link]); 
  }
  
  async openMenuModal() {
    const modal = await this.modalController.create({
      component: SideMenuComponent,
    });
    await modal.present();
  }
  
   async toggleLike(post: any) {
      const toast = await this.toastController.create({
      message: 'Cannot React, please sign up to interact in the app.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
     await toast.present();
     return;
  }
    
  
  async toggleComments(post: any) {
    const toast = await this.toastController.create({
      message: 'Cannot comment, please sign up to interact in the app.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
    return;
  }

  
 async addComment(post: any) {
      const toast = await this.toastController.create({
      message: 'Cannot comment, please sign up to interact in the app.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
    return;
}
  
filteredPosts(): PostDTO[] {
      if (!this.searchText.trim()) {
        return this.posts;
      }
      const lowerSearch = this.searchText.toLowerCase();
      return this.posts.filter(post =>
        (post.username && post.username.toLowerCase().includes(lowerSearch)) ||
        (post.content && post.content.toLowerCase().includes(lowerSearch))
      );
  }
  
  async navigateToUserProfile() {
    const toast = await this.toastController.create({
      message: 'Please sign up to interact in the app.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
    return;
  }

  async stopUserInteract(){
     const toast = await this.toastController.create({
      message: 'Please sign up to interact in the app.',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
    return;
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Logout canceled');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Logging out...',
              duration: 2000, 
            });
            await loading.present();
            setTimeout(() => {
              loading.dismiss();
              this.router.navigateByUrl('/login');
            }, 2000);
          }
        }
      ]
    });
    await alert.present();
  }

}
