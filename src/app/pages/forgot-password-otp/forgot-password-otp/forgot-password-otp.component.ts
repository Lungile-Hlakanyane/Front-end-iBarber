import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, IonInput, LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ForgotPasswordOtpComponent  implements OnInit {
  @ViewChildren(IonInput) otpInputs!: QueryList<IonInput>;
  email: string = '';

  constructor(
    private toastController:ToastController,
    private route:ActivatedRoute,
    private loadingController:LoadingController,
    private navController:NavController,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.email = params['email'];
    });
  }

  goBack(){
    this.navController.back();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }
}
