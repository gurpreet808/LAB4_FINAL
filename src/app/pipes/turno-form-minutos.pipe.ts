import { Pipe, PipeTransform } from '@angular/core';
import { isNull } from 'util';

@Pipe({
  name: 'turnoFormMinutos'
})
export class TurnoFormMinutosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {

    //console.log(value);
    if (value !== null) {
      if (value != "") {
        return value + " minutos";
      }
    }

    return null;
  }
}
