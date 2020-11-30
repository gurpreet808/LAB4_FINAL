import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { Usuario } from 'src/app/clases/usuario';
import { SalaService } from 'src/app/servicios/sala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  turnoForm: FormGroup;
  submitted: boolean;

  minDateValue = new Date(Date.now());
  fecha: Date;

  dia: number = -1;
  hora: number = -1;
  minutos: number = -1;

  //Esto es para que se bloquee que pida turno si está ocupado
  puedePedirTurno: boolean = true;

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

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService, public router: Router,
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
    this.roundTimeQuarterHour();

    this.turnoForm = this.fb.group({
      'especialidad': new FormControl('', Validators.required),
      'tipo': new FormControl('consulta', Validators.required),
      'fecha': new FormControl(this.minDateValue, Validators.required),
      'especialista_uid': new FormControl('', Validators.required),
      'duracion': new FormControl(15)
    });

  }

  roundTimeQuarterHour() {
    this.minDateValue.setMilliseconds(Math.round(this.minDateValue.getMilliseconds() / 1000) * 1000);
    this.minDateValue.setSeconds(Math.round(this.minDateValue.getSeconds() / 60) * 60);
    this.minDateValue.setMinutes(Math.round(this.minDateValue.getMinutes() / 15) * 15);
  }

  onSubmit() {
    this.submitted = true;

    if (this.puedePedirTurno) {
      this.save();
      this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Se registró su turno' });
      this.router.navigateByUrl("/mis-turnos");
    } else {
      this.messageService.add({ severity: 'error', summary: '¡Uhhh!', detail: 'El especialista no dispone más turnos para ' + this.turnoForm.controls["tipo"].value });
    }

  }

  save() {

    console.clear();

    Object.assign(this.turno, this.turnoForm.value);

    this.turno.fecha = this.turnoForm.controls["fecha"].value.toString();
    console.log("B4 save this.turno", this.turno);

    this.turno.estado = "confirmado";
    this.turno.cliente_uid = this.servUsuario.afAuth.auth.currentUser.uid;
    this.turno.cliente_nombre = this.servUsuario.el_usuario.value.nombre;
    this.turno.cliente_mail = this.servUsuario.el_usuario.value.correo;
    this.turno.encuesta = {
      cerrada: false,
      clinica: 0,
      especialista: 0,
      experiencia: ""
    }

    if (this.servUsuario.el_usuario.value.esCliente) {
      this.turno.quien_pidio = "cliente";
    } else {
      this.turno.quien_pidio = "recepcionista";
    }

    this.servTurno.AgregarUno(this.turno);

    this.turno = {};
    this.turnoForm.reset();
  }

  change_fecha() {
    console.log(this.isOpenNow(this.turnoForm.controls['fecha'].value));

    if (this.isOpenNow(this.turnoForm.controls['fecha'].value)) {

    } else {
      this.turnoForm.controls['fecha'].setErrors(
        {
          horarioNoLaboral: true
        }
      );

      console.log(this.turnoForm.controls['fecha'].errors);
    }

    this.checkSiHayTurnos();
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
    if (this.turnoForm.controls["tipo"].value == "tratamiento") {
      this.turnoForm.controls["duracion"].patchValue(60);
    } else {
      this.turnoForm.controls["duracion"].patchValue(15);
    }

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

  }

  isOpenNow(fecha: Date): boolean {
    this.dia = fecha.getDay();
    this.hora = fecha.getHours();
    this.minutos = fecha.getMinutes();

    //Domingo
    if (this.dia == 0) {
      return false;
    }

    //De L a V
    if (this.dia >= 1 && this.dia <= 5) {
      if (this.hora >= 8 && this.minutos >= 0) {
        if (this.hora <= 18 && this.minutos <= 59) {
          return true;
        }
      }
    }

    //Sabado
    if (this.dia == 6) {
      if (this.hora >= 8 && this.minutos >= 0) {
        if (this.hora <= 13 && this.minutos <= 59) {
          return true;
        }
      }
    }

    return false;
  }

  texto_error_cliente_nombre(): string {
    return "Se requiere el nombre";
  }

  texto_error_cliente_mail(): string {
    return "El mail debe ser con formato usuario@dominio.com";
  }

  texto_error_especialidad(): string {
    return "Seleccione una especialidad";
  }

  texto_error_tipo(): string {
    return "Elija el tipo de turno";
  }

  texto_error_fecha(): string {
    /* if (this.turnoForm.controls['fecha'].errors['horarioNolaboral']) {
      return "Atendemos de 8 a 19hs (Lunes a Viernes) y de 8 a 14hs (Sábados)";
    } */

    return "Elija una fecha válida";
  }

  texto_error_especialista_uid(): string {
    return "Seleccione un especialista";
  }

  texto_error_sala_uid(): string {
    return "Se requiere la sala";
  }

}
