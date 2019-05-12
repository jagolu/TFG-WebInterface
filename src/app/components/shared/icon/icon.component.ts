import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';
import { IconModel } from 'src/app/models/models';

@Component({
  selector: '<app-icon>',
  template: ``,
  styles: [ ]
})
export class IconComponent  implements OnInit{

  @Input() Icon:IconModel;
  
  private icon:any;

  constructor(private eR:ElementRef) { }

  ngOnInit(){
    var node = document.createElement("i");
    node.style.color = this.Icon.firstColor;
    node.style.cursor = "pointer";
    node.className = this.Icon.base+" "+this.Icon.firstIcon;
    this.eR.nativeElement.appendChild(node);
    this.icon = this.eR.nativeElement.firstChild;
    this.Icon.secondIcon = this.Icon.secondIcon==null ? this.Icon.firstIcon : this.Icon.secondIcon;
    this.Icon.secondColor = this.Icon.secondColor==null ? this.Icon.firstColor : this.Icon.secondColor;
  }

  @HostListener('mouseenter') mouseEnterChangeColor(){
      this.icon.style.color = this.icon.style.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;
  }

  @HostListener('mouseleave') mouseLeaveChangeColor(){
      this.icon.style.color = this.icon.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;
  }

  @HostListener('click') mouseClickChangeColor(){
    this.icon.style.color = this.icon.style.color == this.Icon.firstColor ? this.Icon.secondColor : this.Icon.firstColor;

    let oldNewClass = this.icon.classList.contains(this.Icon.firstIcon) ? 
      {"new": this.Icon.secondIcon, "old": this.Icon.firstIcon} : {"new": this.Icon.firstIcon, "old": this.Icon.secondIcon}
    this.icon.classList.remove(oldNewClass.old);
    this.icon.classList.add(oldNewClass.new);
  }
}
