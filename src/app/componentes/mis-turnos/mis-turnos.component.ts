import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Usuario } from 'src/app/clases/usuario';
import { Sala } from 'src/app/clases/sala';
import { SalaService } from 'src/app/servicios/sala.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
  providers: [MessageService]
})
export class MisTurnosComponent implements OnInit {

  encuestaForm: FormGroup;
  submitted: boolean;

  displayDialog: boolean;
  newTurno: boolean;
  selectedTurno: Turno;
  cols: any[];

  turno: Turno = {};

  puedo_encuesta: boolean = false;
  puedo_cancelar: boolean = false;

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService,
    public servSala: SalaService, public servUsuario: UsuarioService, public fb: FormBuilder, public messageService: MessageService) {

  }

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      'clinica': new FormControl('', Validators.required),
      'especialista': new FormControl('', Validators.required),
      'experiencia': new FormControl('')
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cliente_nombre', header: 'Cliente' },
      { field: 'especialista_nombre', header: 'Especialista' },
      { field: 'especialidad', header: 'Especialidad' },
      { field: 'tipo', header: 'Tipo de turno' },
      { field: 'sala_nombre', header: 'Sala' },
      { field: 'estado', header: 'Estado' },
      { field: 'resenia', header: 'Reseña' },
      { field: 'encuesta', header: 'Encuesta' }
    ];

  }

  onSubmit() {
    this.submitted = true;

    this.save();
    
    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
  }
  
  save() {
    
    console.clear();
    
    this.turno.encuesta = this.encuestaForm.value;
    delete this.turno.fecha;

    console.log("B4 save this.turno", this.turno);

    if (this.encuestaForm.controls["estado"].value == "esperando" || this.encuestaForm.controls["estado"].value == "atendiendo") {
      this.servSala.ModificarUno(this.turno.sala_id, { en_uso: true });
    } else {
      this.servSala.ModificarUno(this.turno.sala_id, { en_uso: false });
    }

    this.servTurno.ModificarUno(this.turno.id, this.turno);

    this.displayDialog = false;
    this.turno = {};
    this.encuestaForm.reset();
  }

  delete() {
    /* this.servTurno.BorrarUno(this.turno.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    }); */

    this.turno = {};
    this.encuestaForm.reset();

    this.displayDialog = false;
  }

  showDialogToAdd() {
    this.newTurno = true;
    this.turno = {};
    this.encuestaForm.reset();

    this.displayDialog = true;
  }

  cancelar(){
    this.turno.estado = "cancelado";

    console.log(this.turno);

    delete this.turno.fecha;

    this.servTurno.ModificarUno(this.turno.id, this.turno);

    this.displayDialog = false;
    this.turno = {};
    this.encuestaForm.reset();
    
    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
  }

  onRowSelect(event) {
    this.newTurno = false;
    this.turno = this.cloneTurno(event.data);

    if (this.turno.estado == "finalizado") {
      this.puedo_encuesta = true;
      this.puedo_cancelar = false;
    } else {
      this.puedo_encuesta = false;
      this.puedo_cancelar = true;

      if (this.turno.estado == "atendiendo" || this.turno.estado == "cancelado") {
        this.puedo_cancelar = false;
      }
    }

    this.displayDialog = true;
  }

  cloneTurno(c: Turno): Turno {
    let turno = {};
    this.encuestaForm.reset();

    for (let prop in c) {
      turno[prop] = c[prop];
      if (this.encuestaForm.controls[prop]) {
        this.encuestaForm.controls[prop].setValue(c[prop]);
      }
    }

    return turno;
  }

  texto_error_clinica(): string {
    return "Se requiere el puntaje de la clinica";
  }

  texto_error_especialista(): string {
    return "Se requiere el puntaje del especialista";
  }

  texto_error_experiencia(): string {
    return "Se requiere que nos cuentes tu experiencia";
  }

}
