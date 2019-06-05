import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'onlyDatePipe'
})
export class OnlyDatePipe implements PipeTransform {

  transform(fullDate: string): string {
    try{
      let fullYear = Number(fullDate.substring(0,4));
      let year = Number(fullDate.substring(2, 4));
      let month = Number(fullDate.substring(5, 7));
      let day = Number(fullDate.substring(8, 10));
      let now = new Date();
      
      if(now.getDate() == day && 
        now.getMonth()+1 == month && 
        (now.getFullYear() == fullYear || now.getFullYear() == year))
      {
        return "Today";
      }
  
      return `${day}/${month}/${year}`;
    }catch(Error){
      return "";
    }
  }
}
