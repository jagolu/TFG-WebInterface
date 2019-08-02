import { Component, OnInit } from '@angular/core';
import { GroupInfoService } from 'src/app/services/userServices/group-info.service';
import { GroupService } from 'src/app/services/restServices/group.service';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styles: []
})
export class GroupInfoComponent implements OnInit {

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
  public groupName:string;

  /**
   * The join date of the actual user
   * to the group
   * 
   * @access public
   * @var {string} dateJoin
   */
  public dateJoin:string;

  /**
   * The role date of the actual user
   * 
   * @access public
   * @var {string} dateRole
   */
  public dateRole:string;

  /**
   * Max capacity of the group
   * 
   * @access public
   * @var {number} maxCapacity
   */
  public maxCapacity:number;

  /**
   * The actual capacity of the group
   * 
   * @access public
   * @var {number} actualCapacity
   */
  public actualCapacity:number;

  /**
   * The date when the group was created
   * 
   * @access public
   * @var {string} createDate
   */
  public createDate:string;

  /**
   * The weekly pay of the group
   * 
   * @access public
   * @var {number} weeklyPay
   */
  public weeklyPay:number;

  /**
   * The role of the user in the group
   * 
   * @access public
   * @var {string} role 
   */
  public role:string;

  /**
   * A icon of a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;

  /**
   * A icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  /**
   * A icon of a normal user
   * 
   * @access public
   * @var {IconModel} icon_user
   */
  public icon_user:IconModel = Icons.USER;

  /**
   * A icon of a coin
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
   * @param {GroupInfoService} __groupInfoS To get the info of the group
   * @param {GroupService} __groupS To do group http requests
   */
  constructor(private __groupInfoS:GroupInfoService, private __groupS:GroupService) { }

  /**
   * Gets the info of the group
   * 
   * @OnInit
   */
  ngOnInit() {
    this.__groupInfoS.info.subscribe(page=>{
      try{
        this.role = page.members ? page.members[page.members.length-1].role : "";
        this.groupName = page.name;
        this.dateJoin = page.dateJoin;
        this.dateRole = page.dateRole;
        this.maxCapacity = page.maxCapacity;
        this.actualCapacity = page.actualCapacity;
        this.createDate = page.createDate;
        this.weeklyPay = page.weeklyPay;
      }catch(Error){}
    });
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Leaves the group
   * 
   * @access public
   */
  public leaveGroup(){
    this.__groupS.leaveGroup(this.groupName);
  }
}