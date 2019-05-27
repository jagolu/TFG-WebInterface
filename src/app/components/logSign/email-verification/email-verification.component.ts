import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styles: []
})
export class EmailVerificationComponent implements AfterViewInit{

  private token:string;

  constructor(private aR:ActivatedRoute, private _authS:AuthenticationService) { 
      this.token = this.aR.snapshot.paramMap.get('token');
  }

  ngAfterViewInit(){
    this._authS.checkEmailValidation(this.token);
  }
}
