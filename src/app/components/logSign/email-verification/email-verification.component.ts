import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styles: []
})
export class EmailVerificationComponent implements AfterViewInit{

  @ViewChild(LoadingComponent) loading:LoadingComponent;

  private token:string;

  constructor(private aR:ActivatedRoute, private _authS:AuthenticationService) { 
      this.token = this.aR.snapshot.paramMap.get('token');
  }

  ngAfterViewInit(){
    this.checkEmail();
  }

  checkEmail(){
    this._authS.checkEmailValidation(this.token).subscribe(
      success=>{
        console.log("success");
      },
      error=>{
        console.log("error");
      }
    )
  }
}
