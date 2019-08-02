import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/restServices/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styles: []
})
export class EmailVerificationComponent implements AfterViewInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The token of verification
   * 
   * @access private
   * @var {string} _token
   */
  private _token:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ActivatedRoute} __aR To get the url param
   * @param {AuthenticationService} __authS To verify the token
   */
  constructor(private __aR:ActivatedRoute, private __authS:AuthenticationService) { 
      this._token = this.__aR.snapshot.paramMap.get('token');
  }

  /**
   * Verifies the token
   * 
   * @OnInit
   */
  ngAfterViewInit(){
    this.__authS.checkEmailValidation(this._token);
  }
}
