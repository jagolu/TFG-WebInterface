import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to manage the loading animation
 * 
 * @class
 */
export class LoadingService{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Var to save the HTML associated to the icon tag
   * 
   * @access private
   * @var {HTMLElement} loading
   */
  private loading:HTMLElement;

  /**
   * Var to save the HTML associated to the navbar tag
   * 
   * @access private
   * @var {HTMLElement} navbar
   */
  private navbar:HTMLElement;

  /**
   * Var to save the the HTML associatedto the router-outlet tag
   * 
   * @access private
   * @var {HTMLElement} outlet
   */
  private outlet:HTMLElement;

  /**
   * Var to save if loading animation is visible or not
   * 
   * @access private
   * @var {boolean} isLoading
   */
  private isLoading:boolean;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
    this.isLoading = false;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * Start the loading animation
   * 
   * @access public
   */
  public startLoading(){
    if(this.isLoading) return;
    this.loading = (document.querySelector("#loading") as HTMLElement);
    this.navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.outlet = (document.querySelector(".main") as HTMLElement);
    this.resize(true);
    this.isLoading = true;
  }

  /**
   * Stops the loading animation
   * 
   * @access public
   */
  public stopLoading(){
    if(!this.isLoading) return;
    this.resize(false);
    this.isLoading = false;
  }
  

  //
  // ────────────────────────────────────────────────────────────────────────────────────
  //   :::::: P R I V A T E   F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Change the display attribute of the screen elements to hide them
   * 
   * @access private
   * @param {boolean} hide True to hide the elements, false to show them 
   */
  private resize(hide:boolean){
    this.navbar.style.display = hide ? "none" : "flex";
    this.outlet.style.display = hide ? "none" : "block";
    this.loading.style.display = hide ? "block" : "none";
    this.loading.style.marginTop = hide ? "17%" : "0"; 
  }
}
