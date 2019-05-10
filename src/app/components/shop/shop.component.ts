import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/userServices/session.service';
import { ShopOffer } from 'src/app/models/models';
import { ShopService } from 'src/app/services/restServices/shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
/**
 * Class to manage the ShopComponent view
 * 
 * @class
 */
export class ShopComponent implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * All the offers to show
   * 
   * @access public
   * @var {ShopOffer[]} offers 
   */
  public offers:ShopOffer[];

  /**
   * All the filters to filt the offers
   * 
   * @access public
   * @var {string[]} filters
   */
  public filters: string[];

  /** 
   * The groups of the user
   * 
   * @access public
   * @var {Group[]} groups
   */
  public groups:Group[];

  /**
   * To filt the type of offers to show in the view
   * 
   * @access public
   * @var {string} show 
   */
  public show: string;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   * @param {ActivatedRoute} aR  To check the offer-type param
   * @param {Router} router To redirect the user if the param isn't correct 
   * @param {SessionService} sessionS To get the user groups
   * @param {ShopService} shopS To interact with the shop requests
   */
  constructor(private aR:ActivatedRoute, private router:Router, private sessionS:SessionService, private shopS:ShopService) { 
    this.shopS.getAllOffers().subscribe(
      (ok:any)=>{
        this.offers = ok.offers;
        this.intializeFilters();
        this.intializeShow();
      }
    );
  }

  /**
   * Get the groups of the user as observable and save them
   * in groups var
   * 
   * @OnInit
   */
  ngOnInit(){
    this.sessionS.User.subscribe(u => {
      try{ this.groups = u.groups; }
      catch(Exception){ this.groups = []; }
    });    
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Function to buy a buy-item associated 
   * 
   * @access public
   * @param {string} selectId The id of the select tag to get from 
   * there the group associated to the buy item
   * @param {string} buy The buy item
   */
  public buy(buy:string, selectId?:string){
    let groupName = selectId ? this.getGroupFromTag(selectId) : null;
    
    this.shopS.doABuy({
      "productId" : buy,
      "group" : groupName
    }).subscribe();
  }
  

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Initialize what offers will be shown depending on the
   * uri. If the uri isn't correct it will return the user to
   * the index page.
   * 
   * @access private
   */
  private intializeShow(){
    this.show = this.aR.snapshot.paramMap.get('type');
    let can = this.filters.some(filt => filt == this.show);
    if(!can) this.router.navigate(['']);
  }

  /**
   * Initialze the filter depending on the types which the 
   * offers have. Adding the type "All".
   * 
   * @access private
   */
  private intializeFilters(){
    this.filters = [];
    this.offers.forEach(offer => {
      if(!this.filters.includes(offer.type)){
        this.filters.push(offer.type);
      }
    });
    this.filters.push("All");
  }

  /**
   * Function to get the group name selected on the <select> tag
   * asociated to the tagId
   * 
   * @access private
   * @param {tagId} tagId The id of the <select> tag
   * @return {string} The name of the group.
   */
  private getGroupFromTag(tagId?:string){
    let index = (document.querySelector("#"+tagId) as HTMLSelectElement).selectedIndex;
    return this.groups[index].name;
  }
}
