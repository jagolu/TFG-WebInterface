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
import { SocialButtonComponent } from './components/logSign/social-button/social-button.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { UserGroupsComponent } from './components/user/view-user/user-groups/user-groups.component';
import { UserInfoFormComponent } from './components/user/view-user/user-info-form/user-info-form.component';
import { PasswordAlertComponent } from './components/shared/password-alert/password-alert.component';


// Directives


// Pipes
import { OnlyDatePipe } from './pipes/only-date.pipe';


// Services
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { PasswordAlertService } from './services/password-alert.service';
import { SessionService } from './services/session.service';
import { AuthGuardService } from './services/canActivate/AuthGuard.service';




// Interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';


// Routing
import { AppRoutingModule } from './app-routing.module';


// New modules import
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from 'src/environments/secret';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Base64ImagePipe } from './pipes/base64-image.pipe';


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
    SocialButtonComponent,
    ViewUserComponent,
    OnlyDatePipe,
    UserGroupsComponent,
    UserInfoFormComponent,
    PasswordAlertComponent,
    Base64ImagePipe
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AuthenticationService,
    UserService,
    AlertService,
    LoadingService,
    PasswordAlertService,
    SessionService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
