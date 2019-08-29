import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconModel, Icons, NewMessage, ComponentID } from 'src/app/models/models';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupService } from 'src/app/services/restServices/group.service';
import { ReloadService } from 'src/app/services/userServices/reload.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: []
})
export class GroupComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The name of the group
   * 
   * @access public
   * @var {string} groupName
   */
  public groupName:string = null;

  /**
   * The group news 
   * 
   * @access public
   * @var {NewMessage[]} news
   */
  public news:NewMessage[] = [];

  /**
   * The role of the user
   * 
   * @access public
   * @var {string} role
   */
  public role:string;

  /**
   * The coins of the user
   * 
   * @access public
   * @var {number} coins
   */
  public coins:number;

  /**
   * A icon of a ball
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;

  /**
   * The icon of a coin
   * 
   * @access public
   * @var {IconModel} icon_coin
   */
  public icon_coin:IconModel = Icons.COIN;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ActivatedRoute} __aR To get the name of group 
   * @param {GroupInfoService} __groupPageS To save and get the info of the group
   * @param {GroupService} __groupS To do the http request and get the group info
   * @param {ReloadService} __reloadS To get the events to reload the group page
   */
  constructor(
    private __aR:ActivatedRoute, 
    private __groupPageS:GroupInfoService, 
    private __groupS:GroupService,
    private __reloadS:ReloadService
  ) { 
    this.__aR.params.subscribe(param=>{
      if(decodeURIComponent(param.group) != this.groupName){
        this.groupName = param.group; 
        this.__groupS.getPageGroup(this.groupName);
      }
    });

    this.__groupPageS.info.subscribe(page=>{
      try{
        this.role = page.members ? page.members[page.members.length-1].role : "";
        this.coins = page.members ? page.members[page.members.length-1].coins : 0;
        this.news = page.news;
      }catch(Error){}
    });

    this.__reloadS.reloadComponent.subscribe(r=>{
      if(r == ComponentID.GROUP) this.__groupS.getPageGroup(this.groupName);
    });
  }

  //
  // ────────────────────────────────────────────────────────────────────────  ──────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Loads the group page
   * 
   * @access public
   */
  public loadGroup(){
    this.__reloadS.reloadGroup();
  }
}