import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ImagePreviewModalComponent  implements OnInit {
  @Input() imageSrc!: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  close(){
    this.modalController.dismiss();
  }

}
