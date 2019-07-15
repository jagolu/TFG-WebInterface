import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { UserInGroupSearch, IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-see-user-groups-admin',
  templateUrl: './see-user-groups-admin.component.html',
  styles: []
})
/**
 * Class to fill an alert with the info of the groups of an user
 * 
 * @class
 */
export class SeeUserGroupsADMINComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The info of the groups
   * 
   * @access public
   * @var {UserInGroupSearch[]} groups
   */
  public groups:UserInGroupSearch[] = [];

    
  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * The icon of a standar person
   * 
   * @access public
   * @var {IconModel} icon_user
   */
  public icon_user:IconModel = Icons.USER;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AlertService} alertS To get the info to fill the alert 
   */
  constructor(private alertS:AlertService) { 
    this.alertS.oInfo.subscribe(groups=>{
      try{this.groups = groups;}
      catch(Error){this.groups = null}
    });
  }
}
