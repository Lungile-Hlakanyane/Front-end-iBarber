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


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    LoginComponent, RegisterComponent, OtpComponent,
    FeedComponent, BottomNavigationComponent, SideMenuComponent, ProfileComponent, 
    PersonalInfoModalComponent, ChatComponent,ChatListComponent,CreatePostComponent,
    BookingsComponent,SelectBarberComponent,ViewBarberProfileComponent,BookAppointmentComponent,
    PaymentMethodsComponent,SuccessPayModalComponent,RateModalComponent,ReactiveFormsModule,
    BarberBookingsComponent,CreateSlotComponent,ViewClientProfileComponent
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
