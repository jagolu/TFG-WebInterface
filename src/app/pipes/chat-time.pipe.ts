import { Pipe, PipeTransform } from '@angular/core';
import { OnlyDatePipe } from './only-date.pipe';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  /**
   * Returns a string with a formatted date with time
   * 
   * @param {string} fullDate Datetime format
   * @return {string} 
   */
  transform(fullDate:string): any {
    try{
      //The result of OnlyDatePipe pipe
      let datePipe =new  OnlyDatePipe;
      let date = datePipe.transform(fullDate);

      //Get the hours from the string
      let startIndex = fullDate.lastIndexOf("T")+1;
      let hours = fullDate.substring(startIndex, startIndex+2);
      let min = fullDate.substring(startIndex+3, startIndex+5);

      return `${date} - ${hours}:${min}`;
    }catch(Error){return "";}
  }
}
