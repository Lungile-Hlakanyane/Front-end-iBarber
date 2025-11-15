import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FaqService } from 'src/app/services/faq-service/faq.service';
import { UserQuestionDTO } from 'src/app/models/UserQuestionDTO';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class QuestionModalComponent  implements OnInit {
  questionForm!: FormGroup;

  constructor(
    private modalController:ModalController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private loadingController:LoadingController,
    private faqService:FaqService
  ) { }

  ngOnInit() {
    this.questionForm = this.formBuilder.group({
      name: [''],
      question: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  async submitQuestion() {
  if (this.questionForm.valid) {
    const formValue: UserQuestionDTO = this.questionForm.value;

    const loading = await this.loadingController.create({
      message: 'Submitting...',
      spinner: 'circular'
    });
    await loading.present();

    this.faqService.submitQuestion(formValue).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Your question has been submitted!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.closeModal();
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Failed to submit question. Please try again.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
        console.error('Submission error:', err);
      }
    });
  }
}



  closeModal(){
    this.modalController.dismiss();
  }

}
