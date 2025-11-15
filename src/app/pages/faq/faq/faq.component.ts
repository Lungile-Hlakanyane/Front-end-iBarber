import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { QuestionModalComponent } from 'src/app/reuseable-components/question-modal/question-modal/question-modal.component';
import { FaqService } from 'src/app/services/faq-service/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FaqComponent  implements OnInit {

     faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Go to the Bookings tab, choose a barber and time slot, then confirm.',
      showAnswer: false
    },
    {
      question: 'Can I cancel or reschedule?',
      answer: 'Yes, open Booking History and select the appointment you want to modify.',
      showAnswer: false
    },
    {
      question: 'Is an account required?',
      answer: 'Yes, registering ensures you can manage bookings and receive updates.',
      showAnswer: false
    },
    {
      question: 'How can I contact support?',
      answer: 'Email us at support@ibarber.com or go to the Help section.',
      showAnswer: false
    }
  ];

  fetchedFaqs: any[] = [];

  constructor(
    private navController:NavController,
    private modalController:ModalController,
    private faqService:FaqService
  ) { }

 
  toggleAnswer(faq: any) {
    faq.showAnswer = !faq.showAnswer;
  }

  navigateBack() {
    this.navController.back();
  }

  ngOnInit() {
    this.loadSubmittedFaqs();
  }

  async openQuestionModal() {
    const modal = await this.modalController.create({
      component: QuestionModalComponent,
      cssClass: 'question-modal'
    });
    await modal.present();
  }

  loadSubmittedFaqs() {
    this.faqService.getAllQuestions().subscribe({
      next: (data) => {
        // Only show questions that have answers
        this.fetchedFaqs = data
          .filter(q => q.answered && q.answer)
          .map(q => ({
            question: q.question,
            answer: q.answer,
            showAnswer: false
          }));
      },
      error: (err) => {
        console.error('Failed to load submitted FAQs', err);
      }
    });
  }

}
