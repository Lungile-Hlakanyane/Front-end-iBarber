import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuComponent } from '../reuseable-components/side-menu/side-menu.component';
import { ModalController } from '@ionic/angular';
import { RegisterService } from '../services/user-service/register.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  showSearchBar = false;
  searchText = '';
  userDetails: any;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService:RegisterService
  ) { }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  posts = [
    {
      barberName: 'Jay The Barber',
      profileImage: 'assets/barbers/jay.jpg',
      imageUrl: 'assets/cuts/fade1.jpg',
      caption: 'Fresh fade drop 🔥 Book me via iBarber app!',
      timestamp: '2 hours ago',
      liked: false,
      showComments: false,
      comments: [],
      newComment: ''
    },
    {
      barberName: 'Mel Trims',
      profileImage: 'assets/barbers/mel.jpg',
      imageUrl: 'assets/cuts/taper.jpg',
      caption: 'Tapered look for the weekend 💈',
      timestamp: 'Yesterday',
      liked: false,
      showComments: false,
      comments: [],
      newComment: ''
    },
    {
      barberName: 'Fade King',
      profileImage: 'assets/barbers/king.jpg',
      imageUrl: 'assets/cuts/skinfade.jpg',
      caption: 'Skin fade perfection! DM to lock a slot!',
      timestamp: 'Just now',
      liked: false,
      showComments: false,
      comments: [],
      newComment: ''
    }
  ];

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

  toggleLike(post: any) {
    post.liked = !post.liked;
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }
  
  
  addComment(post: any) {
    if (post.newComment && post.newComment.trim() !== '') {
      post.comments.push(post.newComment.trim());
      post.newComment = '';
    }
  }

}
