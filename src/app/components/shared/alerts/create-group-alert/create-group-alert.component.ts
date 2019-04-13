import { GroupService } from './../../../../services/restServices/group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicAlert } from './../basic-alert';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-group-alert',
  templateUrl: './create-group-alert.component.html',
  styles: []
})
export class CreateGroupAlertComponent extends BasicAlert implements OnInit {

  public createGroupForm:FormGroup;

  constructor(private groupS:GroupService) { 
    super();
  }

  ngOnInit() {
    this.initializeForm();
  }

  createGroup(){
    this.hideClicking();
    this.groupS.createGroup({
      "name": this.createGroupForm.controls["name"].value,
      "type": this.createGroupForm.controls["groupType"].value
    }).subscribe();
  }

  private initializeForm(){
    this.createGroupForm = new FormGroup({
      'name': new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ],
        [this.validateNameNotTaken.bind(this)]
      ),
      'groupType': new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
  }

  private hideClicking(){
    (document.querySelector("#hideCreateGroupAlert") as HTMLElement).click();
  }

  private validateNameNotTaken(control: FormControl) {
    return this.groupS.checkGroupName(control.value).pipe(map(res => {
      return res ? null : { groupNameTaken: true };
    }));
  }
}
