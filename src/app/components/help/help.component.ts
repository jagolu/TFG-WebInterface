import { Component } from '@angular/core';
import { IconModel, Icons } from 'src/app/models/models';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styles: []
})
export class HelpComponent {

    
  /**
   * The icon of a a crown
   * 
   * @access public
   * @var {IconModel} icon_crown
   */
  public icon_crown:IconModel = Icons.CROWN;
  
  /**
   * The icon of a wizard hat
   * 
   * @access public
   * @var {IconModel} icon_wizard
   */
  public icon_wizard:IconModel = Icons.WIZARD;

  constructor() { }
}
