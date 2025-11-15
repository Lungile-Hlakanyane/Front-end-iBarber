import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegisterComponent } from './pages/auth/register/register/register.component';
import { OtpComponent } from './pages/auth/otp/otp/otp.component';
import { FeedComponent } from './pages/feed/feed/feed.component';
import { BottomNavigationComponent } from './reuseable-components/bottom-navigation/bottom-navigation.component';
import { SideMenuComponent } from './reuseable-components/side-menu/side-menu.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { PersonalInfoModalComponent } from './reuseable-components/personal-infor-modal/personal-info-modal/personal-info-modal.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { ChatListComponent } from './pages/chat-list/chat-list/chat-list.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { BookingsComponent } from './pages/bookings/bookings/bookings.component';
import { SelectBarberComponent } from './pages/select-barber/select-barber/select-barber.component';
import { ViewBarberProfileComponent } from './pages/view-barber-profile/view-barber-profile/view-barber-profile.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment/book-appointment.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods/payment-methods.component';
import { SuccessPayModalComponent } from './reuseable-components/successs-payment-modal/success-pay-modal/success-pay-modal.component';
import { RateModalComponent } from './reuseable-components/rate-a-barber/rate-modal/rate-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BarberBookingsComponent } from './pages/barber-bookings/barber-bookings/barber-bookings.component';
import { CreateSlotComponent } from './pages/create-slot/create-slot/create-slot.component';
import { ViewClientProfileComponent } from './pages/view-client-profile/view-client-profile/view-client-profile.component';
import { ReportUserModalComponent } from './reuseable-components/report-user-modal/report-user-modal/report-user-modal.component';
import { FianceReportComponent } from './pages/finance-report/fiance-report/fiance-report.component';
import { PortfolioComponent } from './pages/portfolio/portfolio/portfolio.component';
import { ViewPortfolioImageComponent } from './reuseable-components/view-porfolio-image/view-portfolio-image/view-portfolio-image.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users/manage-users.component';
import { AdminViewUserComponent } from './pages/admin-view-user/admin-view-user/admin-view-user.component';
import { AnalyticsComponent } from './pages/analytics/analytics/analytics.component';
import { ReportHandlingComponent } from './pages/report-handling/report-handling/report-handling.component';
import { FeedbackSupportComponent } from './pages/feedback-support/feedback-support/feedback-support.component';
import { BroadcastAnnouncementsComponent } from './pages/broadcast-announcements/broadcast-announcements/broadcast-announcements.component';
import { BannedUserComponent } from './pages/banned-user/banned-user/banned-user.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions/terms-and-conditions.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password/forgot-password.component';
import { ForgotPasswordOtpComponent } from './pages/forgot-password-otp/forgot-password-otp/forgot-password-otp.component';
import { NewPasswordComponent } from './pages/new-password/new-password/new-password.component';
import { PremiumSubscriptionComponent } from './pages/my-subscriptions/premium-subscription/premium-subscription.component';
import { AddCardComponent } from './pages/add-card/add-card/add-card.component';
import { SuccessSubscribeComponent } from './reuseable-components/success-subscribe/success-subscribe/success-subscribe.component';
import { SupportTicketComponent } from './pages/support-ticket/support-ticket/support-ticket.component';
import { SuccessSubmitTicketComponent } from './reuseable-components/success-submit-ticket/success-submit-ticket/success-submit-ticket.component';
import { FaqComponent } from './pages/faq/faq/faq.component';
import { QuestionModalComponent } from './reuseable-components/question-modal/question-modal/question-modal.component';
import { FaqsComponent } from './pages/view-faqs/faqs/faqs.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    LoginComponent, RegisterComponent, OtpComponent,
    FeedComponent, BottomNavigationComponent, SideMenuComponent, ProfileComponent, 
    PersonalInfoModalComponent, ChatComponent,ChatListComponent,CreatePostComponent,
    BookingsComponent,SelectBarberComponent,ViewBarberProfileComponent,BookAppointmentComponent,
    PaymentMethodsComponent,SuccessPayModalComponent,RateModalComponent,ReactiveFormsModule,
    BarberBookingsComponent,CreateSlotComponent,ViewClientProfileComponent,ReportUserModalComponent,
    FianceReportComponent,PortfolioComponent,ViewPortfolioImageComponent,ManageUsersComponent,
    AdminViewUserComponent,AnalyticsComponent,ReportHandlingComponent,FeedbackSupportComponent,
    BroadcastAnnouncementsComponent,BannedUserComponent,TermsAndConditionsComponent,
    ForgotPasswordComponent,ForgotPasswordOtpComponent,NewPasswordComponent,PremiumSubscriptionComponent,
    AddCardComponent,SuccessSubscribeComponent,SupportTicketComponent,SuccessSubmitTicketComponent,FaqComponent,
    QuestionModalComponent,FaqsComponent
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
