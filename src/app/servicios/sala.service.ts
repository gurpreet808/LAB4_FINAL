import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Sala } from '../clases/sala';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  salas: Sala[] = [];
  salaList: AngularFireList<Sala>;

  constructor(public db: AngularFireDatabase) {
    this.salaList = this.db.list<Sala>('/salas');

    this.TraerTodos().subscribe(
      (salasSnapshot: AngularFireAction<DatabaseSnapshot<Sala>>[]) => {
        this.salas = [];

        salasSnapshot.forEach(
          (salaData: AngularFireAction<DatabaseSnapshot<Sala>>) => {

            //console.log(salaData);
            let itemSala: Sala = salaData.payload.toJSON();
            itemSala.id = salaData.key;
            //console.log(itemSala);

            this.salas.push(itemSala);
          });

        console.log(this.salas);
      }
    );
  }

  TraerTodos() {
    return this.salaList.snapshotChanges();
  }

  AgregarUno(elsala: Sala) {
    return this.salaList.push(elsala);
  }

  ModificarUno(refKey: string, data: Sala) {
    //Limpiar el objeto de datos undefined
    return this.salaList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos

    return this.salaList.remove(refKey);
  }
}
