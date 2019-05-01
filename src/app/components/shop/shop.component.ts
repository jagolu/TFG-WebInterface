import { Component } from '@angular/core';
import { OfferType, ShopOffer } from 'src/app/models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent {

  public offers:ShopOffer[];
  public filters: OfferType[];
  public show: string;


  constructor(private aR:ActivatedRoute, private router:Router) { 
    this.intializeFilters();
    this.intitializeOffers();
    this.intializeShow();
  }
  

  /**
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
   * Initializes filters array
   */
  private intializeFilters(){
    this.filters = [
      OfferType.ALL,
      OfferType.USER,
      OfferType.GROUP
    ]
  }


  /**
   * Initializes offers array
   */
  private intitializeOffers(){
    this.offers = [
      {
        "name" : "GROUP CAPACITY + 5 members",
        "price" : 1,
        "type" : OfferType.GROUP,
        "description" : "Add 5 members of capacity to your actual group capacity!"
      },
      {
        "name" : "GROUP CAPACITY + 25 members",
        "price" : 5,
        "type" : OfferType.GROUP,
        "description" : "Add 25 members of capacity to your actual group capacity!"
      },
      {
        "name" : "GROUP CAPACITY + 50 members",
        "price" : 10,
        "type" : OfferType.GROUP,
        "description" : "Add 50 members of capacity to your actual group capacity!"
      },
      {
        "name" : "Prueba de user",
        "price" : 100,
        "type" : OfferType.USER,
        "description" : "Pruebas!"
      }
    ];
  }
}
