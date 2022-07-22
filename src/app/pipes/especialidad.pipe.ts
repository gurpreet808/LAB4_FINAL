import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../clases/especialidad';
import { EspecialidadService } from '../servicios/especialidad.service';

@Pipe({
  name: 'especialidad'
})
export class EspecialidadPipe implements PipeTransform {

  constructor(public servEspecialidad: EspecialidadService) { }

  transform(value: unknown, ...args: unknown[]) {
    console.log(value);

    let rta = "";

    this.servEspecialidad.especialidades.value.forEach(
      (especialidad: Especialidad) => {
        console.log(especialidad);
        if (especialidad.id == value) {
          rta = especialidad.nombre;
        }
      }
    );

    console.log(rta);

    return rta;
  }

}
