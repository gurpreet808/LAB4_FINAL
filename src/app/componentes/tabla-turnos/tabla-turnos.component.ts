import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

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
      { field: 'sector', header: 'Sector' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'estado', header: 'Estado' },
      { field: 'resenia', header: 'Reseña' },
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