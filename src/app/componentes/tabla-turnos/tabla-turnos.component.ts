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
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  turnoForm: FormGroup;
  submitted: boolean;

  mail_registrado: boolean = false;
  displayDialog: boolean;
  newTurno: boolean;
  selectedTurno: Turno;
  cols: any[];
  minDateValue = new Date(Date.now());
  fecha: Date;

  cantidadMinutosOcupado: number = 0;
  disponibilidadTotal: number = 0;

  puedePedirTurno: boolean = false;

  turno: Turno = {};

  es = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: 'Hoy',
    clear: 'Vaciar',
    dateFormat: 'mm/dd/yy',
    weekHeader: 'Sem'
  };

  especialidades: SelectItem[] = [
    { label: 'Seleccionar', value: null }
  ];

  especialistas: SelectItem[] = [
    { label: 'Seleccionar', value: null }
  ];

  tipos: SelectItem[] = [
    { label: 'Seleccionar', value: null },
    { label: 'Consulta', value: "consulta" },
    { label: 'Tratamiento', value: "tratamiento" }
  ];

  salas: SelectItem[] = [
    { label: 'Seleccionar', value: null },
    { label: 'Consultorio X', value: 'Consultorio X' }
  ];

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService,
    public servSala: SalaService, public servUsuario: UsuarioService, public fb: FormBuilder, public messageService: MessageService) {

    //Las especialidades se definen por los especialistas registrados
    servEspecialidad.especialidadList.valueChanges().subscribe(
      (especialidadesFire: Especialidad[]) => {
        this.especialidades = [
          { label: 'Seleccionar', value: null }
        ];

        especialidadesFire.forEach(
          (especialidadData: Especialidad) => {
            let label = especialidadData.nombre[0].toUpperCase() + especialidadData.nombre.slice(1);
            this.especialidades.push({ value: especialidadData.nombre, label: label });
          });
        //console.log(this.especialidades);
      }
    );

  }

  ngOnInit(): void {
    this.turnoForm = this.fb.group({
      'cliente_nombre': new FormControl('', Validators.required),
      'cliente_mail': new FormControl('', Validators.compose([Validators.email])),
      'especialidad': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
      'fecha': new FormControl('', Validators.required),
      'especialista_uid': new FormControl('', Validators.required),
      'duracion': new FormControl(''),
      //'sala_uid': new FormControl('')
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cliente_nombre', header: 'Cliente' },
      { field: 'especialista_nombre', header: 'Especialista' },
      { field: 'especialista_mail', header: 'Mail Especialista' },
      { field: 'especialidad', header: 'Especialidad' },
      { field: 'tipo', header: 'Tipo de turno' },
      { field: 'sala', header: 'Sala' },
      { field: 'estado', header: 'Estado' },
      { field: 'resenia', header: 'Reseña' },
      { field: 'encuesta', header: 'Encuesta' }
    ];

  }

  onSubmit() {
    this.submitted = true;

    if (this.puedePedirTurno) {
      this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
      this.save();
    } else {
      this.messageService.add({ severity: 'error', summary: '¡Uhhh!', detail: 'El especialista no dispone más turnos para ' + this.turnoForm.controls["tipo"].value });
    }

  }

  save() {

    console.clear();

    Object.assign(this.turno, this.turnoForm.value);

    this.turno.fecha = this.turnoForm.controls["fecha"].value.toString();
    console.log("B4 save this.turno", this.turno);

    if (this.newTurno) {
      this.turno.estado = "confirmado";
      this.servTurno.AgregarUno(this.turno);
      //this.servTurno.AgregarUno(this.turnoForm.value);
    }
    else {
      this.servTurno.ModificarUno(this.turno.id, this.turno);
      //this.servTurno.ModificarUno(this.turno.id, Object.assign(this.turno, this.turnoForm.value));

    }

    this.displayDialog = false;
    this.turno = {};
    this.turnoForm.reset();
  }

  delete() {
    this.servTurno.BorrarUno(this.turno.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

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
    this.change_especialidad();

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

  checkUsuario() {
    for (let i = 0; i < this.servUsuario.clientes.length; i++) {
      let cliente = this.servUsuario.clientes[i];

      if (cliente.correo == this.turnoForm.controls["cliente_mail"].value) {
        this.mail_registrado = true;

        this.turno.cliente_uid = cliente.uid;
        this.turnoForm.controls["cliente_nombre"].setValue(cliente.nombre + ", " + cliente.apellido);

        /* 
        this.turnoForm.controls["cliente_nombre"].markAsTouched();
        this.turnoForm.controls["cliente_nombre"].markAsDirty();
        this.turnoForm.controls["cliente_nombre"].updateValueAndValidity(); 
        */

        //Revisar como bloquear input
        //this.turnoForm.controls["cliente_nombre"].disable();

        break;
      } else {
        this.mail_registrado = false;

        //Revisar como bloquear ese control
        //this.turnoForm.controls["cliente_nombre"].enable();

        delete this.turno.cliente_uid;
      }

    }
  }

  change_especialidad() {
    this.especialistas = [
      { label: 'Seleccionar', value: null }
    ];

    let hay: boolean = false;

    this.servUsuario.empleados.forEach(
      (empleado: Usuario) => {
        if (empleado.especialidad == this.turnoForm.controls["especialidad"].value) {
          hay = true;
          this.especialistas.push({
            label: empleado.nombre + ", " + empleado.apellido,
            value: empleado.uid
          });
        }
      }
    );

    if (!hay) {
      this.especialistas = [
        { label: 'No hay especialistas disponibles', value: null }
      ];
    }

    this.checkSiHayTurnos();

  }

  change_tipo() {
    /* if (this.turnoForm.controls["tipo"].value == "consulta") {
      this.turnoForm.controls["duracion"].patchValue(15);
    } else if (this.turnoForm.controls["tipo"].value == "tratamiento") {
      this.turnoForm.controls["duracion"].patchValue(60);
    } */

    if (this.turnoForm.controls["tipo"].value == "tratamiento") {
      this.turnoForm.controls["duracion"].patchValue(60);
    } else {
      this.turnoForm.controls["duracion"].patchValue(15);
    }

    this.checkSiHayTurnos();
  }

  change_fecha() {
    (this.turnoForm.controls["fecha"].value as Date).setHours(0, 0, 0);
    this.checkSiHayTurnos();
  }

  change_especialista() {
    this.servUsuario.empleados.forEach(
      (empleado: Usuario) => {
        if (empleado.uid == this.turnoForm.controls["especialista_uid"].value) {
          this.turno.especialista_mail = empleado.correo;
          this.turno.especialista_nombre = empleado.nombre + ", " + empleado.apellido;
        }
      }
    );

    this.checkSiHayTurnos();
  }

  checkSiHayTurnos() {

    try {
      this.calcularMinutosOcupado();
    } catch (error) {
      //console.log(error);
    }

    try {
      this.calcularDisponibilidadTotal();
    } catch (error) {
      //console.log(error);
    }

    try {
      if ((this.disponibilidadTotal - this.cantidadMinutosOcupado - this.turnoForm.controls["duracion"].value) < 1) {
        this.puedePedirTurno = false;
      } else {
        this.puedePedirTurno = true;
      }
    } catch (error) {
      //console.log(error);
    }

  }

  calcularMinutosOcupado() {
    this.cantidadMinutosOcupado = 0;

    this.servTurno.turnos.forEach(
      (turnoItem: Turno) => {
        //console.log("turno analisis", turnoItem);

        if (turnoItem.especialista_uid == this.turnoForm.controls["especialista_uid"].value) {
          //console.log("mismo UID");
          if (turnoItem.fecha == (this.turnoForm.controls["fecha"].value as Date).toString()) {
            //console.log("misma fecha");
            if (turnoItem.estado == "confirmado") {
              //console.log("es confirmado");
              this.cantidadMinutosOcupado = this.cantidadMinutosOcupado + turnoItem.duracion;
            }
          }
        }
      }
    );
  }

  calcularDisponibilidadTotal() {
    if ((this.turnoForm.controls["fecha"].value as Date).getDay() == 6) {
      this.disponibilidadTotal = (14 - 8) * 60;
      console.log("es sábado", this.disponibilidadTotal);
    } else {
      this.disponibilidadTotal = (19 - 8) * 60;
      console.log("NO es sábado", this.disponibilidadTotal);
    }
  }

  calcularCantidadTurnos(duracion: number): number {
    return Math.floor((this.disponibilidadTotal - this.cantidadMinutosOcupado) / duracion);
  }

  change_sala() {
    this.servSala.salas.forEach(
      (sala: Sala) => {
        if (sala.id == this.turnoForm.controls["sala_uid"].value) {
          this.turno.sala_nombre = sala.nombre;
        }
      }
    );
  }

  texto_error_cliente_nombre(): string {
    return "Se requiere el nombre";
  }

  texto_error_cliente_mail(): string {
    return "El mail debe ser con formato usuario@dominio.com";
  }

  texto_error_especialidad(): string {
    return "Se requiere la especialidad";
  }

  texto_error_tipo(): string {
    return "Se requiere el tipo de turno";
  }

  texto_error_fecha(): string {
    return "Se requiere la fecha del turno";
  }

  texto_error_duracion(): string {
    return "Se requiere la duracion del turno";
  }

  texto_error_especialista_uid(): string {
    return "Se requiere el especialista";
  }

  texto_error_sala_uid(): string {
    return "Se requiere la sala";
  }

}