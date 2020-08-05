import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  displayDialog: boolean;
  newUsuario: boolean;
  selectedUsuario: Usuario;
  cols: any[];

  usuario: Usuario = {};

  tipoSelecccionado: any;

  tiposEmpleados = [
    { label: 'Seleccionar', value: null },
    { label: 'Administrador', value: "administrador" },
    { label: 'Recepcionista', value: "recepcionista" },
    { label: 'Especialista', value: "especialista" }
  ];

  especialidades = [
    { label: 'Seleccionar', value: null }
  ];

  constructor(public servUsuario: UsuarioService, public servEspecialidad: EspecialidadService) {
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
      { field: 'uid', header: 'UID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'clave', header: 'Clave' },
      { field: 'tipoEmpleado', header: 'Tipo de Empleado' },
      { field: 'especialidad', header: 'Especialidad' },
      { field: 'foto', header: 'Foto' }
    ];
  }

  showDialogToAdd() {
    this.newUsuario = true;
    this.usuario = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newUsuario) {
      this.usuario.esCliente = false;
      this.servUsuario.AgregarUno(this.usuario);
    }
    else {
      this.servUsuario.ModificarUno(this.usuario.uid, this.usuario);
    }

    this.displayDialog = false;
    this.usuario = {};
  }

  delete() {
    this.servUsuario.BorrarUno(this.usuario.uid).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.usuario = {};
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newUsuario = false;
    this.usuario = this.cloneUsuario(event.data);
    this.displayDialog = true;
  }

  cloneUsuario(c: Usuario): Usuario {
    let usuario = {};
    for (let prop in c) {
      usuario[prop] = c[prop];
    }
    return usuario;
  }

}

