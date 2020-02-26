import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  displayDialog: boolean;
  newTurno: boolean;
  selectedTurno: Turno;
  cols: any[];

  turno: Turno = {};

  especialidades = [
    { label: 'Seleccionar', value: null }
  ];

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService) {
    servEspecialidad.especialidadList.valueChanges().subscribe(
      (especialidadesFire: Especialidad[]) => {
        this.especialidades = [
          { label: 'Seleccionar', value: null }
        ];

        especialidadesFire.forEach(
          (especialidadData: Especialidad) => {
            let label = especialidadData.nombre[0].toUpperCase() + especialidadData.nombre.slice(1);
            this.especialidades.push({ value: especialidadData.nombre, label: label});
          });
        console.log(this.especialidades);
      }
    );

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'especialista', header: 'Especialista' },
      { field: 'sala', header: 'Sala' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'estado', header: 'Estado' },
      { field: 'reseña', header: 'Reseña' },
      { field: 'encuesta', header: 'Encuesta' }
    ];
  }

  showDialogToAdd() {
    this.newTurno = true;
    this.turno = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newTurno) {
      this.servTurno.AgregarUno(this.turno);
    }
    else {
      this.servTurno.ModificarUno(this.turno.id, this.turno);
    }

    this.displayDialog = false;
    this.turno = {};
  }

  delete() {
    this.servTurno.BorrarUno(this.turno.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.turno = {};
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newTurno = false;
    this.turno = this.cloneTurno(event.data);
    this.displayDialog = true;
  }

  cloneTurno(c: Turno): Turno {
    let turno = {};
    for (let prop in c) {
      turno[prop] = c[prop];
    }
    return turno;
  }

}