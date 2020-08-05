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
    this.turnoForm = this.fb.group({
      'especialidad': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required),
      'fecha': new FormControl('', Validators.required),
      'especialista_uid': new FormControl('', Validators.required),
      'duracion': new FormControl(''),
      //'sala_uid': new FormControl('')
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.puedePedirTurno) {
      this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
      this.save();
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

    this.servTurno.AgregarUno(this.turno);

    this.turno = {};
    this.turnoForm.reset();
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
