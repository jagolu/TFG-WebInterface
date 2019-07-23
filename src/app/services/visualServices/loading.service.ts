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
   * @var {HTMLElement} __loading
   */
  private __loading:HTMLElement;

  /**
   * Var to save the HTML associated to the navbar tag
   * 
   * @access private
   * @var {HTMLElement} __navbar
   */
  private __navbar:HTMLElement;

  /**
   * Var to save the the HTML associated to the router-outlet tag
   * 
   * @access private
   * @var {HTMLElement} __outlet
   */
  private __outlet:HTMLElement;

  /**
   * Var to save the the HTML associated to the chat tag
   * 
   * @access private
   * @var {HTMLElement} __chat
   */
  private __chat:HTMLElement;

  /**
   * Var to save if loading animation is visible or not
   * 
   * @access private
   * @var {boolean} __isLoading
   */
  private __isLoading:boolean;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  
  /**
   * @constructor
   */
  constructor() { 
    this.__isLoading = false;
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
    if(this.__isLoading) return;
    this.__loading = (document.querySelector("#loading") as HTMLElement);
    this.__navbar = (document.querySelector("#navbarId") as HTMLElement);
    this.__chat = (document.querySelector("#mainChatWindowId") as HTMLElement);
    this.__outlet = (document.querySelector(".main") as HTMLElement);
    this.resize(true);
    this.__isLoading = true;
  }

  /**
   * Stops the loading animation
   * 
   * @access public
   */
  public stopLoading(){
    if(!this.__isLoading) return;
    this.resize(false);
    this.__isLoading = false;
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
    this.__navbar.style.display = hide ? "none" : "flex";
    this.__outlet.style.display = hide ? "none" : "block";
    this.__chat.style.display = hide ? "none" : "block";
    this.__loading.style.display = hide ? "block" : "none";
    this.__loading.style.marginTop = hide ? "17%" : "0"; 
  }
}
