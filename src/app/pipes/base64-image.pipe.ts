import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64Image'
})
export class Base64ImagePipe implements PipeTransform {

  /**
   * Get the correct src for base64 images
   * @param {string} value The base 64 image
   */
  transform(value: string): string {
    return `data:image/jpg;base64,${value}`;
  }
}
