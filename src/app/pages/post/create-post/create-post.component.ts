import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePostComponent  implements OnInit {
  postText = '';
  selectedAudience = 'anyone'; 
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]);
  }

}
