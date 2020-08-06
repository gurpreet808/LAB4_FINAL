import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { SelectItem, MessageService } from 'primeng/api';
import { TurnoService } from 'src/app/servicios/turno.service';
import { SalaService } from 'src/app/servicios/sala.service';
import { Sala } from 'src/app/clases/sala';

@Component({
  selector: 'app-turnos-atender',
  templateUrl: './turnos-atender.component.html',
  styleUrls: ['./turnos-atender.component.css']
})
export class TurnosAtenderComponent implements OnInit {
  el_turno: Turno;
  displayDialogEncuesta: boolean = false;
  displayDialogResenia: boolean = false;
  displayDialogAtender: boolean = false;
  mi_resenia: string = "";
  sin_resenia: boolean = true;
  sala_elegida: { id_sala: string, nombre_sala: string } = null;

  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  salas: SelectItem[] = [
    { label: 'Seleccionar', value: null },
    { label: 'Consultorio X', value: { id_sala: "1", nombre_sala: "Consultorio X" } }
  ];

  constructor(public servTurno: TurnoService, public servSala: SalaService, public messageService: MessageService) {
    servSala.salaList.valueChanges().subscribe(
      (salasFire: Sala[]) => {
        this.salas = [
          { label: 'Seleccionar', value: null }
        ];

        salasFire.forEach(
          (salaData: Sala) => {
            if (salaData.estado == "activo" && salaData.en_uso.toString() == "false") {
              this.salas.push({ value: { id_sala: salaData.id, nombre_sala: salaData.nombre }, label: salaData.nombre });
            }
          });
        //console.log(this.salas);
      }
    );
  }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Más nuevos', value: '!fecha' },
      { label: 'Más viejos', value: 'fecha' },
      { label: 'Especialidad', value: 'especialidas' }
    ];
  }

  turnoResenia(event: Event, turno: Turno) {
    event.preventDefault();
    this.el_turno = turno;

    if (this.el_turno.resenia) {
      this.sin_resenia = false;
    }

    this.displayDialogResenia = true;
  }

  turnoEncuesta(event: Event, turno: Turno) {
    event.preventDefault();
    this.el_turno = turno;

    this.displayDialogEncuesta = true;
  }

  turnoAtender(event: Event, turno: Turno) {
    event.preventDefault();
    this.el_turno = turno;

    this.displayDialogAtender = true;
  }

  onDialogHide() {
    this.el_turno = null;
    console.log("me voy");
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  cancelar(_turno: Turno) {
    this.servTurno.ModificarUno(_turno.id, { estado: "cancelado" })
      .then(
        (datos) => {
          console.log("cancelar", datos);
          this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Canceló el turno' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No se pudo cancelar" });
        }
      );

    if (_turno.sala_id) {
      this.servSala.ModificarUno(_turno.sala_id, { en_uso: false }).then(
        () => {
        }
      ).catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error inesperado al modificar la sala" });
        }
      );
    }

  }

  enviarResenia(id_turno: string, mi_resenia: string) {
    this.servTurno.ModificarUno(id_turno, { resenia: mi_resenia })
      .then(
        (datos) => {
          //console.log("Encuesta", datos);
          this.sin_resenia = false;
          this.messageService.add({ severity: 'success', summary: '¡Gracias!', detail: 'Se envió la reseña' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No se pudo cancelar" });
        }
      );
  }

  atender(id_turno: string, id_sala: string, nombre_sala: string) {
    this.servTurno.ModificarUno(id_turno, { sala_id: id_sala, sala_nombre: nombre_sala, estado: "esperando" })
      .then(
        (datos) => {
          this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Asignó al cliente a una sala' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error inesperado al asignar la sala" });
        }
      );
  }

  recibir(id_turno: string, id_sala: string) {
    this.servTurno.ModificarUno(id_turno, { estado: "atendiendo" })
      .then(
        (datos) => {
          this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Está atendiendo al cliente' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error inesperado al asignar la sala" });
        }
      );

    this.servSala.ModificarUno(id_sala, { en_uso: true }).then(
      () => {
      }
    ).catch(
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error inesperado al modificar la sala" });
      }
    );
  }

  finalizar(_turno: Turno) {
    this.servTurno.ModificarUno(_turno.id, { estado: "finalizado" })
      .then(
        (datos) => {
          this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Finalizó el turno' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No se pudo finalizar" });
        }
      );

    if (_turno.sala_id) {
      this.servSala.ModificarUno(_turno.sala_id, { en_uso: false }).then(
        () => {
        }
      ).catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Error inesperado al modificar la sala" });
        }
      );
    }

  }

  change_sala() {
    /* this.servSala.salas.forEach(
      (sala: Sala) => {
        if (sala.id == this.turnoForm.controls["sala_id"].value) {
          this.turno.sala_nombre = sala.nombre;
        }
      }
    ); */

  }

  fondo_estado(estado: string) {
    switch (estado) {
      case 'confirmado':
        return "background-color: green;";

      case 'esperando':
        return "background-color: Olive;";

      case 'atendiendo':
        return "background-color: DarkBlue;";

      case 'cancelado':
        return "background-color: FireBrick;";

      case 'finalizado':
        return "background-color: DimGrey;";

      default:
        return "";
    }
  }

}

