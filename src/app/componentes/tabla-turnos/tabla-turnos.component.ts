import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Especialidad } from 'src/app/clases/especialidad';
import { TurnoService } from 'src/app/servicios/turno.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  mail_registrado: boolean = false;
  displayDialog: boolean;
  newTurno: boolean;
  selectedTurno: Turno;
  cols: any[];
  minDateValue = new Date(Date.now());
  fecha: Date;

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

  especialidades = [
    { label: 'Seleccionar', value: null }
  ];

  especialistas = [
    { label: 'Seleccionar', value: null }
  ];

  tipos = [
    { label: 'Seleccionar', value: null },
    { label: 'Consulta', value: "consulta" },
    { label: 'Tratamiento', value: "tratamiento" }
  ];

  constructor(public servTurno: TurnoService, public servEspecialidad: EspecialidadService, public servusuario: UsuarioService) {
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
        console.log(this.especialidades);
      }
    );

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'cliente_nombre', header: 'Cliente' },
      { field: 'especialista_nombre', header: 'Especialista' },
      { field: 'especialidad', header: 'Especialidad' },
      { field: 'sector', header: 'Sector' },
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
    //(this.turno.fecha as Date).setSeconds(0,0);
    this.turno.fecha = this.turno.fecha.toString();
    //console.log("B4 save", this.turno);

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

  checkUsuario() {
    for (let i = 0; i < this.servusuario.clientes.length; i++) {
      let cliente = this.servusuario.clientes[i];

      if (cliente.correo == this.turno.cliente_mail) {
        this.mail_registrado = true;
        this.turno.cliente_uid = cliente.uid;
        this.turno.cliente_nombre = cliente.nombre + ", " + cliente.apellido;
        break;
      } else {
        this.mail_registrado = false;
        delete this.turno.cliente_uid;
      }

    }
  }

  change_especialidad() {
    this.especialistas = [
      { label: 'Seleccionar', value: null }
    ];

    let hay: boolean = false;

    this.servusuario.empleados.forEach(
      (empleado: Usuario) => {
        if (empleado.especialidad == this.turno.especialidad) {
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

  }

  change_tipo() {
    if (this.turno.tipo == "consulta") {
      this.turno.duracion = 15;
    } else if (this.turno.tipo == "tratamiento") {
      this.turno.duracion = 60;
    } else {
      this.turno.duracion = 0;
    }
  }

  change_fecha() {
    (this.turno.fecha as Date).setSeconds(0,0);
  }

  change_especialista() {
    this.servusuario.empleados.forEach(
      (empleado: Usuario) => {
        if (empleado.uid == this.turno.especialista_uid) {
          this.turno.especialista_mail = empleado.correo;
          this.turno.especialista_nombre = empleado.nombre + ", " + empleado.apellido;
        }
      }
    );
  }

}