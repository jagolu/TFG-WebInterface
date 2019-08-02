import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';
import { IconModel } from 'src/app/models/models';

@Component({
  selector: '<app-icon>',
  template: ``,
  styles: [ ]
})
export class IconComponent  implements OnInit{

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The info of the icon to show
   * 
   * @access public
   * @var {IconModel} Icon
   */
  @Input() Icon:IconModel;
  

  /**
   * The HTML element of the icon
   * 
   * @access private
   * @var {any} _iconInfo
   */
  private _iconInfo:any;


  //
  // ──────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {ElementRef} __eR To manage the icon tag
   */
  constructor(private __eR:ElementRef) { }

  /**
   * Gets the icon model and manage its info
   * 
   * @OnInit
   */
  ngOnInit(){
    var node = document.createElement("i");
    node.style.color = this.Icon.firstColor;
    node.style.cursor = "pointer";
    node.className = this.Icon.base+" "+this.Icon.firstIcon;
    this.__eR.nativeElement.appendChild(node);
    this._iconInfo = this.__eR.nativeElement.firstChild;
    this.Icon.secondIcon = this.Icon.secondIcon==null ? this.Icon.firstIcon : this.Icon.secondIcon;
    this.Icon.secondColor = this.Icon.secondColor==null ? this.Icon.firstColor : this.Icon.secondColor;
  }


  //
  // ──────────────────────────────────────────────────────────────────────────────────────
  //   :::::: L I S T E N E R   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Change the icon color (if it's necesary) when
   * the mouse comes on the icon
   */
  @HostListener('mouseenter') mouseEnterChangeColor(){
      this._iconInfo.style.color = this._iconInfo.style.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;
  }

  /**
   * Change the icon color (if it's necesary) when
   * the mouse comes out the icon
   */
  @HostListener('mouseleave') mouseLeaveChangeColor(){
      this._iconInfo.style.color = this._iconInfo.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;
  }

  /**
   * Change the icon when the icon is clicked
   */
  @HostListener('click') mouseClickChangeColor(){
    this._iconInfo.style.color = this._iconInfo.style.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;

    let oldNewClass = this._iconInfo.classList.contains(this.Icon.firstIcon) ? 
      {"new": this.Icon.secondIcon, "old": this.Icon.firstIcon} : {"new": this.Icon.firstIcon, "old": this.Icon.secondIcon}
    this._iconInfo.classList.remove(oldNewClass.old);
    this._iconInfo.classList.add(oldNewClass.new);
  }
}
