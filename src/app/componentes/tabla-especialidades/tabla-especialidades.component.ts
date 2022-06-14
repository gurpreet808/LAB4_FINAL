import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.scss']
})
export class TablaEspecialidadesComponent implements OnInit {

  itemDialog: boolean = false;
  _item: Especialidad = {
    nombre: '',
  };

  constructor(public servEspecialidad: EspecialidadService, public servSpinner: SpinnerService) {
    this.BlanquearItem();
  }

  ngOnInit(): void {
  }

  items(): Especialidad[] {
    return this.servEspecialidad.especialidades.value;
  }

  BlanquearItem() {
    this._item = {
      nombre: '',
    };
  }

  Borrar(_especialidad: Especialidad) {
    this.servSpinner.loading = true;

    this.servEspecialidad.BorrarUno(_especialidad.id!).then(
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

  Editar(_especialidad: Especialidad) {
    this._item = _especialidad;
  }

  Nuevo() {
    this.BlanquearItem();
    this.itemDialog = true;
  }

  Guardar() {
    this.servSpinner.loading = true;

    if (this._item.id) {
      this.servEspecialidad.ModificarUno(this._item.id, this._item).then(
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
      this.servEspecialidad.AgregarUno(this._item).then(
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

}
