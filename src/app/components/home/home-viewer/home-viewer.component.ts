import { Component, Input } from '@angular/core';
import { NewMessage } from 'src/app/models/models';
import { AdminService } from 'src/app/services/restServices/admin.service';

@Component({
  selector: 'app-home-viewer',
  templateUrl: './home-viewer.component.html',
  styles: []
})
export class HomeViewerComponent {

  //
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: C L A S S   V A R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //

  /**
   * The news to show
   * 
   * @access public
   * @var {NewMessage[]} news
   */
  @Input() news: NewMessage[] = [];


  //
  // ─────────────────────────────────────────────────────────────────────────
  //   :::::: C O N S T R U C T O R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //

  /**
   * @constructor
   * @param {AdminService} __adminS To remove the new
   */
  constructor(private __adminS:AdminService) { }


  //
  // ──────────────────────────────────────────────────────────────────────────────────
  //   :::::: P U B L I C   F U N C T I O N S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────
  //

  /**
   * Remvoe a new
   * 
   * @access public
   * @param {string} id The id of the new to remove
   */
  public removeNew(id:string){
    this.__adminS.removeNew(id).subscribe((news:any)=>this.news = news);
  }
}
