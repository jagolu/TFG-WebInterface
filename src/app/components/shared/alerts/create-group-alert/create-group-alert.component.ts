import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicAlert } from './../basic-alert';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group-alert',
  templateUrl: './create-group-alert.component.html',
  styles: []
})
export class CreateGroupAlertComponent extends BasicAlert implements OnInit {

  public createGroupForm:FormGroup;
  public isPublic:boolean;

  constructor() { 
    super();
  }

  ngOnInit() {
    this.isPublic = true;
    this.initializeForm();
  }

  createGroup(){
    console.log(
      "name-->", this.createGroupForm.controls["name"].value,
      "password--->", this.createGroupForm.controls["password"].value,
      "type-->", this.createGroupForm.controls["groupType"].value
    )
  }

  private initializeForm(){
    this.createGroupForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
          //TODO validator para nombres de grupo y de usuario
        ]
      ),
      'password': new FormControl(
        '',
        [
          this.isPublic ? Validators.nullValidator : Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]//TODO add asyncronous validator to check if the group name is taken
      ),
      'groupType': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
  }

  public setPublic(value:boolean){
    this.isPublic = value;
    this.initializeForm();
  }

}
