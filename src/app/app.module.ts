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
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SocialButtonComponent } from './components/logSign/social-button/social-button.component';
import { ViewUserComponent } from './components/user/view-user/view-user.component';
import { UserGroupsComponent } from './components/user/view-user/user-groups/user-groups.component';
import { UserInfoFormComponent } from './components/user/view-user/user-info-form/user-info-form.component';
import { CreateGroupAlertComponent } from './components/shared/alert/create-group-alert/create-group-alert.component';
import { GroupComponent } from './components/group/group.component';
import { GroupBetComponent } from './components/group/group-bet/group-bet.component';
import { GroupUsersComponent } from './components/group/group-users/group-users.component';
import { SearchGroupComponent } from './components/search-group/search-group.component';
import { ShopComponent } from './components/shop/shop.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { DeleteAccountAlertComponent } from './components/shared/alert/delete-account-alert/delete-account-alert.component';
import { InfoAlertComponent } from './components/shared/alert/info-alert/info-alert.component';
import { JoinPasswordGroupComponent } from './components/shared/alert/join-password-group/join-password-group.component';
import { GroupInfoComponent } from './components/group/group-info/group-info.component';
import { GroupSettingsComponent } from './components/group/group-settings/group-settings.component';
import { PasswordFormComponent } from './components/group/group-settings/password-form/password-form.component';
import { RememberPasswordFormComponent } from './components/logSign/rememberPassword/remember-password-form/remember-password-form.component';
import { DeleteGroupAlertComponent } from './components/shared/alert/delete-group-alert/delete-group-alert.component'
import { ResetPasswordFormComponent } from './components/logSign/rememberPassword/reset-password-form/reset-password-form.component';
import { SocialSignPasswordComponent } from './components/shared/alert/social-sign-password/social-sign-password.component';
import { FootballBetComponent } from './components/bet/create/football-bet/football-bet.component';


// Directives


// Pipes
import { OnlyDatePipe } from './pipes/only-date.pipe';


// Services
import { AuthenticationService } from './services/restServices/authentication.service';
import { UserService } from './services/restServices/user.service';
import { AlertService } from './services/visualServices/alert.service';
import { LoadingService } from './services/visualServices/loading.service';
import { SessionService } from './services/userServices/session.service';
import { AuthGuardService } from './services/canActivate/AuthGuard.service';
import { GroupService } from './services/restServices/group.service';
import { ShopService } from './services/restServices/shop.service';


// Interceptors
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { SuccessInterceptor } from './interceptors/success.interceptor';


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
    LoadingComponent,
    SocialButtonComponent,
    ViewUserComponent,
    OnlyDatePipe,
    UserGroupsComponent,
    UserInfoFormComponent,
    Base64ImagePipe,
    CreateGroupAlertComponent,
    GroupComponent,
    GroupUsersComponent,
    GroupBetComponent,
    SearchGroupComponent,
    ShopComponent,
    AlertComponent,
    DeleteAccountAlertComponent,
    InfoAlertComponent,
    JoinPasswordGroupComponent,
    GroupInfoComponent,
    GroupSettingsComponent,
    PasswordFormComponent,
    RememberPasswordFormComponent,
    DeleteGroupAlertComponent,
    ResetPasswordFormComponent,
    SocialSignPasswordComponent,
    FootballBetComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessInterceptor,
      multi: true
    },
    AuthenticationService,
    UserService,
    AlertService,
    LoadingService,
    SessionService,
    AuthGuardService,
    GroupService,
    ShopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
