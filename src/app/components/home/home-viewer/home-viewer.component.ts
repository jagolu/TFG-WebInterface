import { Component, Input } from '@angular/core';
import { NewMessage } from 'src/app/models/models';

@Component({
  selector: 'app-home-viewer',
  templateUrl: './home-viewer.component.html',
  styles: []
})
export class HomeViewerComponent {

  @Input() news: NewMessage[] = [];

  constructor() { }
}
