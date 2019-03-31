import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Image'
})
export class Base64ImagePipe implements PipeTransform {

  transform(value: string): string {
    return `data:image/jpg;base64,${value}`;
  }
}
