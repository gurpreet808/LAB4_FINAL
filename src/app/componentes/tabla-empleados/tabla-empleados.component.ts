import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { Especialidad } from 'src/app/clases/especialidad';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabla-empleados',
  templateUrl: './tabla-empleados.component.html',
  styleUrls: ['./tabla-empleados.component.css'],
  providers: [MessageService]
})
export class TablaEmpleadosComponent implements OnInit {

  usuarioForm: FormGroup;
  submitted: boolean;

  displayDialog: boolean;
  newUsuario: boolean;
  selectedUsuario: Usuario;
  cols: any[];

  usuario: Usuario = {};

  tipo_especialista: boolean = false;

  tiposEmpleados = [
    { label: 'Seleccionar', value: null },
    { label: 'Administrador', value: "administrador" },
    { label: 'Recepcionista', value: "recepcionista" },
    { label: 'Especialista', value: "especialista" }
  ];

  especialidades = [
    { label: 'Seleccionar', value: null },
    { label: 'Odontología', value: "odontología" },
    { label: 'Endodoncia', value: "endodoncia" }
  ];

  constructor(public servUsuario: UsuarioService, public servEspecialidad: EspecialidadService, public fb: FormBuilder, public messageService: MessageService) {
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
    this.usuarioForm = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'clave': new FormControl('', Validators.required),
      //'foto': new FormControl('', Validators.required),
      'cuil': new FormControl(''),
      'tipoEmpleado': new FormControl('', Validators.required),
      'especialidad': new FormControl('', Validators.required)
    });

    this.cols = [
      { field: 'uid', header: 'UID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'clave', header: 'Clave' },
      { field: 'tipoEmpleado', header: 'Tipo de Empleado' },
      { field: 'especialidad', header: 'Especialidad' },
      { field: 'foto', header: 'Foto' },
      { field: 'cuil', header: 'CUIL' }
    ];
  }

  onSubmit() {
    this.submitted = true;

    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
    this.save();
  }

  save() {

    if (this.newUsuario) {
      this.usuario.esCliente = false;
      this.servUsuario.AgregarUno(this.usuarioForm.value);
    }
    else {
      this.servUsuario.ModificarUno(this.usuario.uid, Object.assign(this.usuario, this.usuarioForm.value));
    }

    this.displayDialog = false;
    this.usuario = {};
    this.usuarioForm.reset();
  }

  delete() {
    this.servUsuario.BorrarUno(this.usuario.uid).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.usuario = {};
    this.usuarioForm.reset();

    this.displayDialog = false;
  }

  showDialogToAdd() {
    this.newUsuario = true;
    this.usuario = {};
    this.usuarioForm.reset();
    //console.log(this.usuarioForm.value);
    this.displayDialog = true;
  }

  onRowSelect(event) {
    this.newUsuario = false;
    this.usuario = this.cloneUsuario(event.data);
    this.displayDialog = true;
  }

  cloneUsuario(c: Usuario): Usuario {
    let usuario = {};
    this.usuarioForm.reset();

    //console.log(this.usuarioForm.controls);

    for (let prop in c) {
      usuario[prop] = c[prop];

      //console.log(prop, c[prop]);

      if (this.usuarioForm.controls[prop]) {
        this.usuarioForm.controls[prop].setValue(c[prop]);
      }

    }

    return usuario;
  }

  change_tipoEmpleado() {
    //Revisar esto que puede estar generando error de It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook?
    
    if (this.usuarioForm.controls["tipoEmpleado"].value == "especialista") {
      this.tipo_especialista = true;
      //this.usuarioForm.controls["tipoEmpleado"]
      this.usuarioForm.controls["especialidad"].enable();
    } else {
      this.tipo_especialista = false;
      this.usuarioForm.controls["especialidad"].disable();
    }
  }

  texto_error_nombre(): string {
    return "Se requiere el nombre";
  }

  texto_error_apellido(): string {
    return "Se requiere el apellido";
  }

  texto_error_correo(): string {
    return "Se requiere el correo con el formato usuario@dominio.com";
  }

  texto_error_clave(): string {
    return "Se requiere la clave";
  }

  texto_error_cuil(): string {
    return "Se requiere el cuil";
  }

  texto_error_tipoEmpleado(): string {
    return "Se requiere el tipo de empleado";
  }

  texto_error_especialidad(): string {
    return "Se requiere la especialidad";
  }

}
