import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GoogleComponent } from './components/sign-up/google/google.component';
import { FacebookComponent } from './components/sign-up/facebook/facebook.component';
import { IconComponent } from './components/shared/icon/icon.component';

// Directives

// Services
import { AuthenticationService } from './services/authentication.service';


// Routing
import { AppRoutingModule } from './app-routing.module';

// New modules import
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { provideConfig } from 'src/environments/sensitive_enviroment';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    GoogleComponent,
    FacebookComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule
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
