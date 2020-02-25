import { Injectable } from '@angular/core';
import { Especialidad } from '../clases/especialidad';
import { AngularFireList, AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidades: Especialidad[] = [];
  especialidadList: AngularFireList<Especialidad>;

  constructor(public db: AngularFireDatabase) {
    this.especialidadList = this.db.list<Especialidad>('/especialidades');

    this.TraerTodos().subscribe(
      (especialidadesSnapshot: AngularFireAction<DatabaseSnapshot<Especialidad>>[]) => {
        this.especialidades = [];

        especialidadesSnapshot.forEach((especialidadData: AngularFireAction<DatabaseSnapshot<Especialidad>>) => {

          //console.log(especialidadData);
          let itemEspecialidad: Especialidad = especialidadData.payload.toJSON();
          itemEspecialidad.id = especialidadData.key;
          //console.log(itemEspecialidad);

          this.especialidades.push(itemEspecialidad);
        });
        console.log(this.especialidades);
      }
    );
  }

  TraerTodos() {
    return this.especialidadList.snapshotChanges();
  }

  AgregarUno(data: Especialidad) {
    delete data.id;
    return this.especialidadList.push(data);
  }

  ModificarUno(refKey: string, data: Especialidad) {
    delete data.id;
    return this.especialidadList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    return this.especialidadList.remove(refKey);
  }
}