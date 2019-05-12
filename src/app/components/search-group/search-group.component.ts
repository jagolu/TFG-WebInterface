import { Component } from '@angular/core';
import { GroupInfo, IconModel, Icons } from 'src/app/models/models';
import { GroupService } from 'src/app/services/restServices/group.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styles: []
})
/**
 * Class to search groups by their name
 * 
 * @class
 */
export class SearchGroupComponent{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * The groups which will show in the view and their info
   * 
   * @access public
   * @var {GroupInfo[]} groups
   */
  public groups:GroupInfo[];

  /**
   * To diferenciate the url from joinNewGroup and look groups (admin function)
   * 
   * @access public
   * @var {Boolean} joinGroups
   */
  public joinGroups:Boolean;

  /**
   * Var to get the ball icon
   * 
   * @access public
   * @var {IconModel} icon_ball
   */
  public icon_ball:IconModel = Icons.BALL;

  /**
   * Var to get the paper icon
   * 
   * @access public
   * @var {IconModel} icon_paper
   */
  public icon_paper:IconModel = Icons.PAPER;

  /**
   * Var to get the key icon
   * 
   * @access public
   * @var {IconModel} icon_key
   */
  public icon_key:IconModel = Icons.KEY;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {GroupService} groupS The service to get the groups
   * @param {Router} route Service to know the actual url
   */
  constructor(private groupS:GroupService, private route:Router) { 
    this.getAllGroups();
    this.joinGroups = route.url.includes("joinNewGroup");
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to search the groups by their name. If the name
   * is null or 0-length it will find all the groups.
   * 
   * @access public
   * @param {string} name The name of the groups to find 
   * @
   */
  public search(name:string){
    if(name.length == 0 || name == null){
      this.getAllGroups();
    }
    else{
      this.getGroupsByName(name);
    }
  }


  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to get all the groups in the app and
   * save them in the groups var
   * 
   * @access private
   */
  private getAllGroups(){
    this.groupS.getAllGroups().subscribe(
      (ok:any) =>  this.groups = ok
    );
  }

  /**
   * Get the groups which include the words in
   * its name
   * 
   * @access private
   * @param {string} name The name of the groups to find 
   */
  private getGroupsByName(name:string){
    this.groupS.getGroups(name).subscribe(
      (ok:any)=> this.groups = ok
    );
  }
}
