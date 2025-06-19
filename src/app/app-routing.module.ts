import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegisterComponent } from './pages/auth/register/register/register.component';
import { OtpComponent } from './pages/auth/otp/otp/otp.component';
import { FeedComponent } from './pages/feed/feed/feed.component';
import { BottomNavigationComponent } from './reuseable-components/bottom-navigation/bottom-navigation.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { ChatListComponent } from './pages/chat-list/chat-list/chat-list.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { BookingsComponent } from './pages/bookings/bookings/bookings.component';
import { SelectBarberComponent } from './pages/select-barber/select-barber/select-barber.component';
import { ViewBarberProfileComponent } from './pages/view-barber-profile/view-barber-profile/view-barber-profile.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment/book-appointment.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods/payment-methods.component';
import { BarberBookingsComponent } from './pages/barber-bookings/barber-bookings/barber-bookings.component';
import { CreateSlotComponent } from './pages/create-slot/create-slot/create-slot.component';
import { ViewClientProfileComponent } from './pages/view-client-profile/view-client-profile/view-client-profile.component';
import { FianceReportComponent } from './pages/finance-report/fiance-report/fiance-report.component';
import { PortfolioComponent } from './pages/portfolio/portfolio/portfolio.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'otp', component:OtpComponent },
  { path: 'feed',component:FeedComponent},
  { path: 'chat/:receiverId', component: ChatComponent },
  { path: 'select-barber', component: SelectBarberComponent},
  { path: 'view-barber-profile', component:ViewBarberProfileComponent},
  { path: 'book-appointment/:barberId', component:BookAppointmentComponent},
  { path: 'payment-methods', component:PaymentMethodsComponent},
  { path: 'create-slots', component:CreateSlotComponent},
  { path: 'view-client-profile', component:ViewClientProfileComponent},
  { path: 'finance-report', component:FianceReportComponent},
  { path: 'portfolio', component:PortfolioComponent},
  { path: 'admin-view-user', component:AdminViewUserComponent},
  { path: 'analytics', component:AnalyticsComponent},
  { path: 'report-handling', component: ReportHandlingComponent},
  { path: 'feedback-support', component:FeedbackSupportComponent},
  { path: 'broadcast-announcement', component:BroadcastAnnouncementsComponent},
  { path: 'banned-user', component:BannedUserComponent},
  { path: 'terms-and-conditions', component:TermsAndConditionsComponent},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'forgot-password-otp', component:ForgotPasswordOtpComponent},
  { path: 'new-password', component:NewPasswordComponent},
  { path: 'preminum-subscription', component:PremiumSubscriptionComponent},
  { path: 'add-card', component:AddCardComponent},
  {
    path: '',
    component: BottomNavigationComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
      { path: 'feed', component:FeedComponent},
      { path: 'profile', component:ProfileComponent},
      { path: 'chat-list', component: ChatListComponent},
      { path: 'create-post', component: CreatePostComponent},
      { path: 'bookings', component: BookingsComponent},
      { path: 'barber-bookings', component: BarberBookingsComponent},
      { path: 'manage-users', component:ManageUsersComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
