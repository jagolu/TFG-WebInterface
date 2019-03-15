import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: '<app-icon>',
  template: ``,
  styles: [ ]
})
export class IconComponent  implements OnInit{

  @Input() base:string="far";
  @Input() firstIcon:string=null;
  @Input() secondIcon:string=null;
  @Input() firstColor:string = "black";
  @Input() secondColor:string=null;
  

  private icon:any;

  constructor(private eR:ElementRef) { }

  ngOnInit(){
    var node = document.createElement("i");
    node.style.color = this.firstColor;
    node.style.cursor = "pointer";
    node.className = this.base+" "+this.firstIcon;
    this.eR.nativeElement.appendChild(node);
    this.icon = this.eR.nativeElement.firstChild;
    this.secondIcon = this.secondIcon==null ? this.firstIcon : this.secondIcon;
    this.secondColor = this.secondColor==null ? this.firstColor : this.secondColor;
  }

  @HostListener('mouseenter') mouseEnterChangeColor(){
      this.icon.style.color = this.icon.style.color == this.firstColor ? this.secondColor : this.firstColor;
  }

  @HostListener('mouseleave') mouseLeaveChangeColor(){
      this.icon.style.color = this.icon.color == this.firstColor ? this.secondColor : this.firstColor;
  }

  @HostListener('click') mouseClickChangeColor(){
    this.icon.style.color = this.icon.style.color == this.firstColor ? this.secondColor : this.firstColor;

    let oldNewClass = this.icon.classList.contains(this.firstIcon) ? 
      {"new": this.secondIcon, "old": this.firstIcon} : {"new": this.firstIcon, "old": this.secondIcon}
    this.icon.classList.remove(oldNewClass.old);
    this.icon.classList.add(oldNewClass.new);
  }
}
