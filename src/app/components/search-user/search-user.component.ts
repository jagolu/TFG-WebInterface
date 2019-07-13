import { Component } from '@angular/core';
import { SearchUserInfo } from 'src/app/models/models';
import { AdminService } from 'src/app/services/restServices/admin.service';
import { AlertService } from 'src/app/services/visualServices/alert.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styles: []
})
export class SearchUserComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The users which will show in the view and their info
   * 
   * @access public
   * @var {SearchUserInfo[]} users
   */
  public users:SearchUserInfo[];

  /**
   * The last find that the user did
   * 
   * @access private
   * @var {string} lastFind
   */
  private lastFind:string = "";


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {AdminService} adminS The service to get the users and block/unblock them
   */
  constructor(private adminS:AdminService, private alertS:AlertService) { 
    this.getAllUsers();
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to search the users by their username or email. If the name
   * is null or 0-length it will find all the users.
   * 
   * @access public
   * @param {string} toFind The username/email of the users to find 
   * @
   */
  public search(toFind:string){
    this.lastFind = toFind;
    if(toFind.length == 0 || toFind == null){
      this.getAllUsers();
    }
    else{
      this.getUsersBy(toFind);
    }
  }

  /**
   * Launch an alert with the info of the groups of the user
   * 
   * @param {SearchUserInfo} user The info of the user 
   */
  public seeGroups(user:SearchUserInfo){
    this.alertS.seeUserGroups(user.groups, user.username);
  }

  /**
   * Ban or unban an user and after that redo the search
   * 
   * @param {string} publicUserId The public id of the user 
   * @param {Boolean} ban True for ban the user, false to unban him 
   */
  public banUser(publicUserId:string, ban:Boolean){
    this.adminS.banUser({
      "publicUserId": publicUserId,
      "ban": ban
    }).subscribe(_=> this.search(this.lastFind));
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to get all the users in the app and
   * save them in the users var
   * 
   * @access private
   */
  private getAllUsers(){
    this.adminS.getAllUsers().subscribe(
      (ok:any) =>  this.users = ok
    );
  }

  /**
   * Get the user which include the words in
   * its username or email
   * 
   * @access private
   * @param {string} toFind The username or email
   */
  private getUsersBy(toFind:string){
    this.adminS.getUser(toFind).subscribe(
      (ok:any)=> this.users = ok
    );
  }
}
