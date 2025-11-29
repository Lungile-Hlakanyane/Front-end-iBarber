import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuComponent } from '../reuseable-components/side-menu/side-menu.component';
import { ModalController } from '@ionic/angular';
import { RegisterService } from '../services/user-service/register.service';
import { PostService } from '../services/post-service/post.service';
import { PostDTO } from '../models/PostDTO';
import { CommentService } from '../services/comment-service/comment.service';
import { CommentDTO } from '../models/Comment';
import { ProfileImageService } from '../services/profile-image-service/profile-image.service';
import { environment } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  refreshSub?: Subscription;
  environment = environment;
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
    private profileImageService:ProfileImageService
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
      error: (err) => console.error('Failed to fetch user:', err)
    });
  }
}

ionViewWillEnter() {
  this.loadPosts();
}

ionViewDidEnter() {
  // Auto-refresh every 30 seconds
  this.refreshSub = interval(30000).subscribe(() => {
    this.loadPosts();
  });
}

ionViewWillLeave() {
  // Stop refreshing when leaving the page
  this.refreshSub?.unsubscribe();
}

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
  
        this.posts.forEach(post => {
          // Fetch username
         this.userService.getUserById(post.userId).subscribe({
         next: (user) => {
          post.username = user.username;
          post.profileImage = user.profileImage; // <== Add this line
        },
         error: () => {
          post.username = 'Unknown';
          post.profileImage = null;
        }
       }); 
          // Fetch likes
          this.postService.getLikes(post.id).subscribe({
            next: (count) => post.likesCount = count,
            error: () => post.likesCount = 0
          });
        
          // Check if current user liked this post
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

  toggleLike(post: any) {
    if (!this.userDetails?.id) return;
  
    if (post.likedByCurrentUser) {
      this.postService.unlikePost(post.id, this.userDetails.id).subscribe({
        next: () => {
          post.likedByCurrentUser = false;
          post.likesCount = (post.likesCount || 1) - 1;
        },
        error: err => console.error('Failed to unlike post', err)
      });
    } else {
      this.postService.likePost(post.id, this.userDetails.id).subscribe({
        next: () => {
          post.likedByCurrentUser = true;
          post.likesCount = (post.likesCount || 0) + 1;
        },
        error: err => console.error('Failed to like post', err)
      });
    }
  }
  

  toggleComments(post: any) {
  post.showComments = !post.showComments;

  if (post.showComments && !post.comments) {
    this.commentService.getCommentsByPostId(post.id).subscribe({
      next: (comments) => {
        // Assign the comments first
        post.comments = comments;

        // For each comment, fetch and attach the username using userId
        post.comments.forEach((comment: { userId: number; username: string; id: any; }) => {
          this.userService.getUserById(comment.userId).subscribe({
            next: (user) => {
              comment.username = user.username;
            },
            error: (err) => {
              console.error(`Failed to fetch user for comment ${comment.id}:`, err);
              comment.username = 'User';
            }
          });
        });
      },
      error: (err) => {
        console.error(`Failed to fetch comments for post ${post.id}:`, err);
        post.comments = [];
      }
    });
  }
}

  
  addComment(post: any) {
    const content = post.newComment?.trim();
    if (!content) return;
    const newComment: CommentDTO = {
      postId: post.id,
      userId: this.userDetails.id,
      content: content
    };
  
    this.commentService.addComment(newComment).subscribe({
      next: (savedComment) => {
        savedComment.username = this.userDetails.username;
        post.comments = post.comments || [];
        post.comments.push(savedComment);
        post.newComment = '';
      },
      error: (err) => {
        console.error('Error posting comment:', err);
      }
    });
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

  navigateToUserProfile(userId: number) {
  this.userService.getUserById(userId).subscribe({
    next: (user) => {
      if (user.role === 'barber') {
        this.router.navigate(['/view-barber-profile', userId], { queryParams: { userId: user.id } });
      } else if (user.role === 'client') {
        this.router.navigate(['/view-client-profile'], { queryParams: { userId: user.id } });
      } else {
        console.warn('Unsupported user role:', user.role);
      }
    },
    error: (err) => {
      console.error('Failed to fetch user for profile navigation:', err);
    }
  });
}

getProfileImageUrl(profileImagePath: string | null | undefined): string {
  const defaultImage = 'assets/profile-pic-image.jpg';

  if (!profileImagePath || profileImagePath === 'undefined') {
    return defaultImage;
  }

  // If the backend only saved the filename
  if (!profileImagePath.startsWith('/uploads') && !profileImagePath.startsWith('http')) {
    profileImagePath = `/uploads/${profileImagePath}`;
  }

  const baseUrl = environment.apiBaseUrl.replace('/api', '');
  return profileImagePath.startsWith('http')
    ? profileImagePath
    : `${baseUrl}${profileImagePath}`;
}


  

}
