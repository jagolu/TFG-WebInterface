import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styles: []
})
export class EmailVerificationComponent{

  private token:string;

  constructor(private aR:ActivatedRoute) { 
    this.token = this.aR.snapshot.paramMap.get('token');
    this.aR.params.subscribe( params=>{
      this.token = params["token"];
    })
  }
}
