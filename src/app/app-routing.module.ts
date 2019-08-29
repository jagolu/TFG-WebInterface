import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuardService
import { AuthGuardService } from './services/canActivate/AuthGuard.service';


// Components
import { HomeComponent } from 'src/app/components/home/home.component';
import { SignUpComponent } from 'src/app/components/logSign/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/components/logSign/log-in/log-in.component';
import { EmailVerificationComponent } from 'src/app/components/logSign/email-verification/email-verification.component';
import { ViewUserComponent } from './components/user/view-user.component';
import { GroupComponent } from './components/group/group.component';
import { SearchGroupComponent } from './components/search-group/search-group.component';
import { RememberPasswordFormComponent } from './components/logSign/rememberPassword/remember-password-form/remember-password-form.component';
import { ResetPasswordFormComponent } from './components/logSign/rememberPassword/reset-password-form/reset-password-form.component';
import { AdminGuardService } from './services/canActivate/admin-guard.service';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { AllConversationsComponent } from './components/direct-messages/all-conversations/all-conversations.component';
import { DirectConversationComponent } from './components/direct-messages/direct-conversation/direct-conversation.component';
import { HelpComponent } from './components/help/help.component';



const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent, canActivate: [AuthGuardService]},
  { path: 'logIn', component: LogInComponent, canActivate: [AuthGuardService]},
  { path: 'rememberPassword', component: RememberPasswordFormComponent, canActivate: [AuthGuardService]},
  { path: 'changePassword/:token', component: ResetPasswordFormComponent, canActivate: [AuthGuardService]},
  { path: 'emailVerification/:token', component: EmailVerificationComponent, canActivate: [AuthGuardService]},
  { path: 'myUserInfo', component: ViewUserComponent, canActivate: [AuthGuardService]},
  { path: 'group/:group', component: GroupComponent, canActivate: [AuthGuardService, AdminGuardService]},
  { path: 'searchGroup', component: SearchGroupComponent, canActivate: [AuthGuardService, AdminGuardService]},
  { path: 'searchUser', component: SearchUserComponent, canActivate: [AuthGuardService, AdminGuardService]},
  { path: 'joinNewGroup', component: SearchGroupComponent, canActivate: [AuthGuardService, AdminGuardService]},
  { path: 'directMessages', component: AllConversationsComponent, canActivate: [AuthGuardService]},
  { path: 'directConversation/:id', component: DirectConversationComponent, canActivate: [AuthGuardService]},
  { path: 'help', component: HelpComponent, canActivate: [AuthGuardService]},
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
