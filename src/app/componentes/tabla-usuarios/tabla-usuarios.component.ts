import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { TipoEmpleado, Usuario } from 'src/app/clases/usuario';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  itemDialog: boolean = false;
  item: Usuario = {
    nombre: '',
    apellido: '',
    fechaAlta: this.servUsuario.getTimestamp(),
    fechaMod: this.servUsuario.getTimestamp(),
    esCliente: false
  };

  opcionesTipoUsuario: SelectItem[] = this.TraerDatosEnum(TipoEmpleado);
  opcionesEspecialidades: SelectItem[] = [];

  constructor(public servUsuario: UsuarioService, public servEspecialidad: EspecialidadService, public servSpinner: SpinnerService) {
    this.BlanquearItem();

    this.servEspecialidad.especialidades.subscribe({
      next: (especialidades: Especialidad[]) => {
        this.opcionesEspecialidades = especialidades.map(
          (especialidad: Especialidad) => {
            return {
              value: especialidad.id!,
              label: especialidad.nombre
            };
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  ngOnInit(): void {
  }

  items(): Usuario[] {
    return this.servUsuario.usuarios.value;
  }

  BlanquearItem() {
    this.item = {
      nombre: '',
      apellido: '',
      fechaAlta: this.servUsuario.getTimestamp(),
      fechaMod: this.servUsuario.getTimestamp(),
      esCliente: false
    };
  }

  Borrar(_usuario: Usuario) {
    this.servSpinner.loading = true;

    this.servUsuario.BorrarUno(_usuario.uid!).then(
      () => {
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ).finally(
      () => {
        this.servSpinner.loading = false;
      }
    );
  }

  Editar(_usuario: Usuario) {
    this.item = _usuario;
    this.itemDialog = true;
  }

  Nuevo() {
    this.BlanquearItem();
    this.itemDialog = true;
  }

  Guardar() {
    this.servSpinner.loading = true;

    if (this.item.uid) {
      this.servUsuario.ModificarUno(this.item.uid, this.item).then(
        () => {
          this.itemDialog = false;
          this.BlanquearItem();
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      ).finally(
        () => {
          this.servSpinner.loading = false;
        }
      );
    } else {
      this.servUsuario.AgregarUno(this.item).then(
        () => {
          this.itemDialog = false;
          this.BlanquearItem();
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      ).finally(
        () => {
          this.servSpinner.loading = false;
        }
      );
    }
  }

  Cancelar() {
    this.itemDialog = false;
    this.BlanquearItem();
  }

  TraerDatosEnum(_enum: any): { value: string, label: string }[] {
    try {
      /* return [{ value: '', label: "Elige una opción" }].concat(
        Object.entries<string>(_enum).map(
          ([key, value]) => {
            return {
              value: key,
              label: value.charAt(0).toUpperCase() + value.slice(1)
            };
          }
        )
      ); */

      return Object.entries<string>(_enum).map(
        ([key, value]) => {
          return {
            value: key,
            label: value.charAt(0).toUpperCase() + value.slice(1)
          };
        }
      );

    } catch (error) {
      console.log(error);
    }
    return [];
  }

}
