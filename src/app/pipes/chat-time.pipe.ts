import { Pipe, PipeTransform } from '@angular/core';
import { OnlyDatePipe } from './only-date.pipe';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  transform(fullDate:string): any {
    try{
      let datePipe =new  OnlyDatePipe;
      let date = datePipe.transform(fullDate);

      let startIndex = fullDate.lastIndexOf("T")+1;
      let hours = fullDate.substring(startIndex, startIndex+2);
      let min = fullDate.substring(startIndex, startIndex+2);

      return `${date} - ${hours}:${min}`;
    }catch(Error){return "";}
  }
}
