import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'onlyDatePipe'
})
export class OnlyDatePipe implements PipeTransform {

  transform(fullDate: string): string {
    let year = Number(fullDate.substring(2, 4));
    let month = Number(fullDate.substring(5, 7));
    let day = Number(fullDate.substring(8, 10));

    return `${day}/${month}/${year}`;
  }
}
