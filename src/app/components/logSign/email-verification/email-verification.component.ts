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
  private msg:string = "asdf"

  constructor(private aR:ActivatedRoute, private _authS:AuthenticationService) { 
      this.token = this.aR.snapshot.paramMap.get('token');
  }

  ngAfterViewInit(){
    this.checkEmail();
  }

  checkEmail(){
    this.loading.startLoading();
    this._authS.checkEmailValidation(this.token).subscribe(
      success=>{
        console.log("success");
        this.loading.stopLoading();
      },
      error=>{
        console.log("error");
        this.loading.stopLoading();
      }
    )
  }
}
