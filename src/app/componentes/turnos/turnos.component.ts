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
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  providers: [MessageService]
})
export class TurnosComponent implements OnInit {

  turnoForm: FormGroup;
  submitted: boolean;

  displayDialog: boolean;
  newTurno: boolean;
  selectedTurno: Turno;
  cols: any[];

  turno: Turno = {};

  salas: SelectItem[] = [
    { label: 'Seleccionar', value: null },
    { label: 'Consultorio X', value: 'Consultorio X' }
  ];

  estados: SelectItem[] = [
    { label: 'Seleccionar', value: null },
    { label: 'Confirmado', value: 'confirmado' },
    { label: 'Esperando', value: 'esperando' },
    { label: 'Atendiendo', value: 'atendiendo' },
    { label: 'Finalizado', value: 'finalizado' },
    { label: 'Cancelado', value: 'cancelado' }
  ];

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService,
    public servSala: SalaService, public servUsuario: UsuarioService, public fb: FormBuilder, public messageService: MessageService) {

    //Las especialidades se definen por los especialistas registrados
    servSala.salaList.valueChanges().subscribe(
      (salasFire: Sala[]) => {
        this.salas = [
          { label: 'Seleccionar', value: null }
        ];

        salasFire.forEach(
          (salaData: Sala) => {
            if (salaData.estado == "activo" && (salaData.en_uso as string) == "false") {
              this.salas.push({ value: salaData.id, label: salaData.nombre });
            }
          });
        //console.log(this.salas);
      }
    );

  }

  ngOnInit(): void {
    this.turnoForm = this.fb.group({
      'sala_id': new FormControl('', Validators.required),
      'estado': new FormControl('', Validators.required),
      'resenia': new FormControl('')
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

    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
    this.save();
  }

  save() {

    console.clear();

    Object.assign(this.turno, this.turnoForm.value);

    delete this.turno.fecha;

    console.log("B4 save this.turno", this.turno);

    if (this.turnoForm.controls["estado"].value == "esperando" || this.turnoForm.controls["estado"].value == "atendiendo") {
      this.servSala.ModificarUno(this.turnoForm.controls["sala_id"].value, {en_uso: true});
    } else {
      this.servSala.ModificarUno(this.turnoForm.controls["sala_id"].value, {en_uso: false});
    }
    
    this.servTurno.ModificarUno(this.turno.id, this.turno);
    
    this.displayDialog = false;
    this.turno = {};
    this.turnoForm.reset();
  }

  delete() {
    /* this.servTurno.BorrarUno(this.turno.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    }); */

    this.turno = {};
    this.turnoForm.reset();

    this.displayDialog = false;
  }

  showDialogToAdd() {
    this.newTurno = true;
    this.turno = {};
    this.turnoForm.reset();

    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newTurno = false;
    this.turno = this.cloneTurno(event.data);

    this.displayDialog = true;
  }

  cloneTurno(c: Turno): Turno {
    let turno = {};
    this.turnoForm.reset();

    for (let prop in c) {
      turno[prop] = c[prop];
      if (this.turnoForm.controls[prop]) {
        this.turnoForm.controls[prop].setValue(c[prop]);
      }
    }

    return turno;
  }

  change_sala() {
    this.servSala.salas.forEach(
      (sala: Sala) => {
        if (sala.id == this.turnoForm.controls["sala_id"].value) {
          this.turno.sala_nombre = sala.nombre;
        }
      }
    );
  }

  texto_error_sala_id(): string {
    return "Se requiere la sala_id";
  }

  texto_error_estado(): string {
    return "Se requiere el tipo de turno";
  }

  texto_error_resenia(): string {
    return "Se requiere la fecha del turno";
  }

}