import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/components/home/home.component';
import { SignUpComponent } from 'src/app/components/logSign/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/components/logSign/log-in/log-in.component';
import { EmailVerificationComponent } from 'src/app/components/logSign/email-verification/email-verification.component';



const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent},
  { path: 'emailVerification/:token', component: EmailVerificationComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
