import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MessageService, SelectItem } from 'primeng/api';
import { SalaService } from 'src/app/servicios/sala.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  el_turno: Turno;
  displayDialogEncuesta: boolean = false;
  displayDialogResenia: boolean = false;

  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(public servTurno: TurnoService, public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Fecha desc', value: '!fecha' },
      { label: 'Fecha asc', value: 'fecha' },
      { label: 'Especialidad asc', value: 'especialidad' },
      { label: 'Especialidad desc', value: '!especialidad' }
    ];
  }

  turnoResenia(event: Event, turno: Turno) {
    event.preventDefault();
    this.el_turno = turno;

    if (!this.el_turno.resenia) {
      this.el_turno.resenia = "";
    }

    this.displayDialogResenia = true;
  }

  turnoEncuesta(event: Event, turno: Turno) {
    event.preventDefault();
    this.el_turno = turno;

    if (!this.el_turno.encuesta) {
      this.el_turno.encuesta = {
        clinica: 0,
        especialista: 0,
        experiencia: "",
        cerrada: false
      }
    }

    this.displayDialogEncuesta = true;
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

  cancelar(id_turno: string) {
    this.servTurno.ModificarUno(id_turno, { estado: "cancelado" })
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
  }

  enviarEncuesta(id_turno: string, mi_encuesta: Turno["encuesta"]) {
    mi_encuesta.cerrada = true;

    this.servTurno.ModificarUno(id_turno, { encuesta: mi_encuesta })
      .then(
        (datos) => {
          //console.log("Encuesta", datos);
          this.displayDialogEncuesta = false;
          this.messageService.add({ severity: 'success', summary: '¡Gracias!', detail: 'Se envió la encuesta' });
        }
      )
      .catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "No se pudo cancelar" });
        }
      );
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
