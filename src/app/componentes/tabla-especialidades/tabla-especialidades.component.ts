import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.css']
})
export class TablaEspecialidadesComponent implements OnInit {

  displayDialog: boolean;
  newEspecialidad: boolean;
  selectedEspecialidad: Especialidad;
  cols: any[];

  especialidad: Especialidad = {};

  constructor(public servEspecialidad: EspecialidadService) {
    
  }

  ngOnInit(): void {
    this.cols = [
      //{ field: 'id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' }
    ];
  }

  showDialogToAdd() {
    this.newEspecialidad = true;
    this.especialidad = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newEspecialidad) {
      this.servEspecialidad.AgregarUno(this.especialidad).then(() => {
        console.log('Documento creado exitósamente!');
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.servEspecialidad.ModificarUno(this.especialidad.id, this.especialidad).then(() => {
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }

    this.displayDialog = false;
    this.especialidad = {};
  }

  delete() {
    this.servEspecialidad.BorrarUno(this.especialidad.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.especialidad = {};
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEspecialidad = false;
    this.especialidad = this.cloneEspecialidad(event.data);
    this.displayDialog = true;
  }

  cloneEspecialidad(c: Especialidad): Especialidad {
    let especialidad = {};
    for (let prop in c) {
      especialidad[prop] = c[prop];
    }
    return especialidad;
  }

}

