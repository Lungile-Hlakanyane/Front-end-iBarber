import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertController, NavController } from '@ionic/angular';
import { FaqService } from 'src/app/services/faq-service/faq.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FaqsComponent  implements OnInit {

  userQuestions: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private faqService:FaqService
  ) { }

  ngOnInit() {
    this.loadQuestions();
  }

   loadQuestions() {
    this.faqService.getAllQuestions().subscribe({
      next: res => {
        this.userQuestions = res;
      },
      error: err => {
        console.error('Failed to load questions', err);
      }
    });
  }

  async openAnswerPrompt(question: any) {
    const alert = await this.alertCtrl.create({
      header: 'Answer Question',
      inputs: [
        {
          name: 'answer',
          type: 'textarea',
          placeholder: 'Enter your answer here...'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Submit',
          handler: data => {
            if (data.answer) {
              this.submitAnswer(question.id, data.answer);
            }
          }
        }
      ]
    });
    await alert.present();
  }

    submitAnswer(questionId: number, answer: string) {
    this.faqService.answerQuestion(questionId, answer).subscribe({
      next: () => this.loadQuestions(),
      error: err => console.error('Error submitting answer:', err)
    });
  }

  goBack(){
    this.navCtrl.back();
  }
}
