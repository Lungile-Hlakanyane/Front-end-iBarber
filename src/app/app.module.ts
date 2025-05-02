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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    LoginComponent, RegisterComponent, OtpComponent,
    FeedComponent, BottomNavigationComponent, SideMenuComponent, ProfileComponent
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
