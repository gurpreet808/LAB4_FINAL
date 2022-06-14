import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { Especialidad } from '../clases/especialidad';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidades: BehaviorSubject<Especialidad[]> = new BehaviorSubject<Especialidad[]>([]);
  especialidadList: AngularFireList<Especialidad> = this.db.list<Especialidad>('/especialidades', ref => ref.orderByChild("nombre"));

  constructor(private db: AngularFireDatabase, public servSpinner: SpinnerService) {
    this.CargarDatos();
  }

  TraerTodos() {
    return this.especialidadList.snapshotChanges();
  }

  CargarDatos() {
    this.servSpinner.loading = true;

    this.TraerTodos().subscribe(
      (especialidadesSnapshot: AngularFireAction<DatabaseSnapshot<Especialidad>>[]) => {
        this.servSpinner.loading = true;

        this.especialidades.next(
          especialidadesSnapshot.map(
            (especialidadData: AngularFireAction<DatabaseSnapshot<Especialidad>>) => {
              //console.log(especialidadData);
              let itemEspecialidad: Especialidad = (especialidadData.payload.toJSON() as Especialidad);
              itemEspecialidad.id = especialidadData.key!;

              return itemEspecialidad;
            }
          )
        );

        this.servSpinner.loading = false;
        console.log(this.especialidades.value);
      }
    );
  }

  AgregarUno(_especialidad: Especialidad) {
    return this.especialidadList.push(_especialidad);
  }

  ModificarUno(refKey: string, data: Especialidad) {
    //Limpiar el objeto de datos undefined
    delete data.id;
    return this.especialidadList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos
    return this.especialidadList.remove(refKey);
  }
}
