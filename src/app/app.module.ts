import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SignUpComponent } from './components/logSign/sign-up/sign-up.component';
import { IconComponent } from './components/shared/icon/icon.component';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/logSign/log-in/log-in.component';
import { EmailVerificationComponent } from './components/logSign/email-verification/email-verification.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { LoadingComponent } from './components/shared/loading/loading.component';


// Directives

// Services
import { AuthenticationService } from './services/authentication.service';


// Routing
import { AppRoutingModule } from './app-routing.module';

// New modules import
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from 'src/environments/secret';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SocialButtonComponent } from './components/logSign/social-button/social-button.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    IconComponent,
    HomeComponent,
    LogInComponent,
    EmailVerificationComponent,
    AlertComponent,
    LoadingComponent,
    SocialButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
