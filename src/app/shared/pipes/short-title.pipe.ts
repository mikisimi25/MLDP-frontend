import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortTitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value) {
      if( value.length > 15) {
        return value.slice(0,15) + "...";
      } else {
        return value;
      }
    } else return '';
  }

}
