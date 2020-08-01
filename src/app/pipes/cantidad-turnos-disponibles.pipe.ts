import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantidadTurnosDisponibles'
})
export class CantidadTurnosDisponiblesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    //console.log(value);
    if (value !== null) {
      return Math.floor((value as number));
    }

    return null;
  }

}
