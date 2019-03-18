import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { AlertComponent, AlertType } from '../../shared/alert/alert.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { SocialUser, AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit{

  @Input() superId:string;
  @Input() type:SocialType;
  @ViewChild(AlertComponent) alert:AlertComponent;
  @ViewChild(LoadingComponent) loading:LoadingComponent;

  private msg:string = "Log in with ";
  private user:SocialUser;
  private loggedIn:boolean;
  private isFacebook:boolean;

  constructor(private _authS:AuthService, private _authenticationS:AuthenticationService) { }

  ngOnInit(){
    this.msg = `Log in with ${this.type}`;
    this.isFacebook = this.type == SocialType.FACEBOOK;
    this._authS.authState.subscribe( (user)=>{
      this.user = user;
      this.loggedIn = (user!=null);
      this.msg = (this.loggedIn && user.provider==this.type.toUpperCase()) ?
        `Continue as ${this.user.firstName}` : `Log in with ${this.type}`;
    });
  }

  signIn(){
    if(!this.loggedIn){
      this.loading.startLoading();
      let alertType:AlertType = AlertType.FACEBOOKERROR.toUpperCase() == this.type.toUpperCase() ?
        AlertType.FACEBOOKERROR : AlertType.GOOGLEERROR;
      let providerId = this.type == SocialType.FACEBOOK ?
      FacebookLoginProvider.PROVIDER_ID : FacebookLoginProvider.PROVIDER_ID;
        
      // this.alert.openAlert(AlertType);
      // this._authenticationS.logSocialMedia(this.type);
      this.loading.stopLoading();
    }
    else console.log("ya estas logueado");
    //TODO MANEJAR LO QUE PASA CUANDO YA ESTA EL USUARIO LOGUEADO Y HACE CLIC EN EL BOTON
  }
}

export enum SocialType{
  GOOGLE = "Google",
  FACEBOOK = "Facebook"
}
