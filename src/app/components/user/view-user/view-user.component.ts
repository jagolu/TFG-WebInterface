import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/restServices/user.service';
import { UserInfoService } from 'src/app/services/userServices/user-info.service';
import { UserInfo } from 'src/app/models/models';
import { SessionService } from 'src/app/services/userServices/session.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The info of the actual user
   * 
   * @access public
   * @var {UserInfo} user
   */
  public user:UserInfo;

  /**
   * The email of the actual user
   * 
   * @access public
   * @var {string} email
   */
  public email:string;

  /**
   * The username of the actual user
   * 
   * @access public
   * @var {string} username
   */
  public username:string;

  /**
   * The time when the user joined
   * 
   * @access public
   * @var {string} joinTime
   */
  public joinTime:string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {UserService} __userS To get the info of the user
   * @param {UserInfoService} __userInfoS To save the info of the user
   * @param {SessionService} __sessionS To get get the username and know if 
   * he is an admin
   */
  constructor(private __userS:UserService, private __userInfoS:UserInfoService, private __sessionS:SessionService){ 
    this.__userS.getUserOptions().subscribe((u:any)=>{
        this.email = u.email;
        this.joinTime = u.timeSignUp;      
        this.__userInfoS.updateInfo({
          "email": u.email,
          "image": u.img
        });
    });
  }

  /**
   * @OnInit
   */
  ngOnInit(){
    this.__sessionS.User.subscribe(u=>{
      try{this.username = u.username}
      catch(Exception){this.username = ""}
    });

    this.__userInfoS.info.subscribe(info => this.user = info);
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * To know if the actual user is an admin or not
   * 
   * @access public
   * @returns {Boolean} True if the user is an admin, false otherwise
   */
  public isAdmin(): Boolean{
    return this.__sessionS.isAdmin();
  }
}