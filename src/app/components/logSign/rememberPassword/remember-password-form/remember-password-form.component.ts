import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-remember-password-form',
  templateUrl: './remember-password-form.component.html',
  styles:[
    '.card-title{ font-size: 250%; }'
  ]
})
export class RememberPasswordFormComponent{

  public rememberPasswordForm:FormGroup;

  constructor(private _authS:AuthenticationService) { 
    this.rememberPasswordForm = new FormGroup({
      "email": new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      )
    })
  }

  public rememberPassword(){
    let email = this.rememberPasswordForm.controls["email" ].value;
    this._authS.rememberPassword(email);
    this.rememberPasswordForm.reset({
      "email": ""
    });
  }

}
