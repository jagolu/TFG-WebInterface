import { Component, OnInit } from '@angular/core';
import { OfferType, ShopOffer, Group, BuyType } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Offers } from 'src/app/models/Shop/AllOffers';
import { SessionService } from 'src/app/services/userServices/session.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit{

  /**
   * @var offers All the offers to show
   */
  public offers:ShopOffer[];

  /**
   * @var filters All the filters to filt the offers
   */
  public filters: OfferType[];

  /** 
   * @var groups User groups
   */
  public groups:Group[];

  /**
   * @var show To filt the type of offers to show in the view
   */
  public show: string;


  /**
   * @constructor
   * @param aR  To check the offer-type param
   * @param router To redirect the user if the param isn't correct 
   * @param sessionS To get the user groups
   */
  constructor(private aR:ActivatedRoute, private router:Router, private sessionS:SessionService) { 
    this.offers = Offers.getAllOffers();
    this.intializeFilters();
    this.intializeShow();
  }

  /**
   * @function ngOnInit
   * Get the user groups in an observable
   */
  ngOnInit(){
    this.sessionS.User.subscribe(u => {
      try{ this.groups = u.groups; }
      catch(Exception){ this.groups = []; }
    });    
  }


  buyWithGroup(selectId:string, buy:BuyType){
    let index = (document.querySelector("#"+selectId) as HTMLSelectElement).selectedIndex;
    let groupName = this.groups[index];
    console.log(groupName, "   ", buy); //TODO BUY
  }

  buy(buyType){
    console.log(buyType);
  }
  

  /** 
   * @function initializeShow
   * Initialize what kind of offer will appear.
   * If the url param doesn't fit with the offer types
   * it redirects to home page
   */
  private intializeShow(){
    this.show = this.aR.snapshot.paramMap.get('type');
    let can = this.filters.some(filt => filt == this.show);
    if(!can) this.router.navigate(['']);
  }


  /**
   * @function intializeFilters
   * Initializes the filters array
   */
  private intializeFilters(){
    this.filters = [
      OfferType.ALL,
      OfferType.USER,
      OfferType.GROUP
    ]
  }
}
