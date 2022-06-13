import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { EstadoSala, Sala, TipoSala } from 'src/app/clases/sala';
import { SalaService } from 'src/app/servicios/sala.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-tabla-salas',
  templateUrl: './tabla-salas.component.html',
  styleUrls: ['./tabla-salas.component.scss']
})
export class TablaSalasComponent implements OnInit {

  itemDialog: boolean = false;
  item: Sala = {
    nombre: '',
    tipo: TipoSala.consultorio,
    estado: EstadoSala.en_construccion,
    en_uso: false
  };

  opcionesTipoSala: SelectItem[] = this.TraerDatosEnum(TipoSala);
  opcionesEstadoSala: SelectItem[] = this.TraerDatosEnum(EstadoSala);

  constructor(public servSala: SalaService, public servSpinner: SpinnerService) {
    this.BlanquearItem();
  }

  ngOnInit(): void {
  }

  items(): Sala[] {
    return this.servSala.salas.value;
  }

  BlanquearItem() {
    this.item = {
      nombre: '',
      tipo: TipoSala.consultorio,
      estado: EstadoSala.en_construccion,
      en_uso: false
    };
  }

  Borrar(_sala: Sala) {
    this.servSpinner.loading = true;

    this.servSala.BorrarUno(_sala.id!).then(
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

  Editar(_sala: Sala) {
    this.item = _sala;
    this.itemDialog = true;
  }

  Nuevo() {
    this.BlanquearItem();
    this.itemDialog = true;
  }

  Guardar() {
    this.servSpinner.loading = true;

    if (this.item.id) {
      this.servSala.ModificarUno(this.item.id, this.item).then(
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
      this.servSala.AgregarUno(this.item).then(
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
