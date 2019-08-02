import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/visualServices/alert.service';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';


@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styles: []
})
export class GroupSettingsComponent implements OnInit {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of  the group
   * 
   * @access private
   * @var {string} _groupName
   */
  private _groupName:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AlertService} __alertS To launch the remove group alert
   * @param {GroupInfoService} __groupInfoS To get the name of the group
   */
  constructor(private __alertS:AlertService, private __groupInfoS:GroupInfoService){}

  /**
   * Gets the name of the group
   * 
   * @OnInit
   */
  ngOnInit(){
    this.__groupInfoS.info.subscribe(page=>{
      try{ this._groupName = page.name; }
      catch(Error){ this._groupName = "" }
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Launchs the remove group alert
   * 
   * @access public
   */
  public openDeleteGroupAlert(){
    this.__alertS.deleteGroup(this._groupName);
  }
}
