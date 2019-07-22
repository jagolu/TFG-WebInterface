import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'onlyDatePipe'
})
export class OnlyDatePipe implements PipeTransform {

  /**
   * Returns a string with a formatted date
   * 
   * @param {string} fullDate Datetime format
   * @return {string} 
   */
  transform(fullDate: string): string {
    try{
      //The actual year format 'YYYY'
      let fullYear = Number(fullDate.substring(0,4));

      //The actual year format 'YY'
      let year = Number(fullDate.substring(2, 4));

      //The actual month format 'MM'
      let month = Number(fullDate.substring(5, 7));

      //The actual day format 'DD'
      let day = Number(fullDate.substring(8, 10));

      //The actual datetime right now
      let now = new Date();
      
      //If is today, just return "Hoy"
      if(now.getDate() == day && now.getMonth()+1 == month && 
        (now.getFullYear() == fullYear || now.getFullYear() == year))
      {
        return "Hoy";
      }
  
      return `${day}/${month}/${year}`;
    }catch(Error){
      return "";
    }
  }
}