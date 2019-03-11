import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: '<app-icon>',
  template: ``,
  styles: [ ]
})
export class IconComponent  implements OnInit{

  @Input() base:string="far";
  @Input() firstIcon:string;
  @Input() secondIcon:string;
  @Input() changeIcon:boolean=false;
  @Input() changeColor:boolean=false;
  @Input() firstColor:string = "black";
  @Input() secondColor:string="#407dbf";

  private icon:any;

  constructor(private eR:ElementRef) { }

  ngOnInit(){
    var node = document.createElement("i");
    node.style.color = this.firstColor;
    node.style.cursor = "pointer";
    node.className = this.base+" "+this.firstIcon;
    this.eR.nativeElement.appendChild(node);
    this.icon = this.eR.nativeElement.firstChild;
  }

  @HostListener('mouseenter') mouseEnterChangeColor(){
    if(this.changeColor){
      this.icon.style.color = this.icon.style.color == this.firstColor ? this.secondColor : this.firstColor;
    }
  }

  @HostListener('mouseleave') mouseLeaveChangeColor(){
    if(this.changeColor){
      this.icon.style.color = this.icon.color == this.firstColor ? this.secondColor : this.firstColor;
    }
  }

  @HostListener('click') mouseClickChangeColor(){
    if(this.changeColor){
      this.icon.style.color = this.icon.style.color == this.firstColor ? this.secondColor : this.firstColor;
    }
    if(this.changeIcon){
      let oldNewClass = this.icon.classList.contains(this.firstIcon) ? 
        {"new": this.secondIcon, "old": this.firstIcon} : {"new": this.firstIcon, "old": this.secondIcon}
      this.icon.classList.remove(oldNewClass.old);
      this.icon.classList.add(oldNewClass.new);
    }
  }
}
