import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { Sala } from '../clases/sala';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  salas: BehaviorSubject<Sala[]> = new BehaviorSubject<Sala[]>([]);
  salaList: AngularFireList<Sala> = this.db.list<Sala>('/salas', ref => ref.orderByChild("nombre"));

  constructor(private db: AngularFireDatabase, public servSpinner: SpinnerService) { 
    this.servSpinner.loading = true;

    this.TraerTodos().subscribe(
      (salasSnapshot: AngularFireAction<DatabaseSnapshot<Sala>>[]) => {
        this.servSpinner.loading = true;
        /* this.salas = salasSnapshot.map(
          (salaData: AngularFireAction<DatabaseSnapshot<Sala>>) => {
            //console.log(salaData);
            let itemSala: Sala = (salaData.payload.toJSON() as Sala);
            itemSala.id = salaData.key!;

            if (itemSala.fotos) {
              itemSala.fotos = Object.values((itemSala.fotos as Object));
            }

            return itemSala;
          }
        ); */

        this.salas.next(
          salasSnapshot.map(
            (salaData: AngularFireAction<DatabaseSnapshot<Sala>>) => {
              //console.log(salaData);
              let itemSala: Sala = (salaData.payload.toJSON() as Sala);
              itemSala.id = salaData.key!;

              return itemSala;
            }
          )
        );

        this.servSpinner.loading = false;
        console.log(this.salas.value);
      }
    );
  }

  TraerTodos() {
    return this.salaList.snapshotChanges();
  }

  AgregarUno(_sala: Sala) {
    return this.salaList.push(_sala);
  }

  ModificarUno(refKey: string, data: Sala) {
    //Limpiar el objeto de datos undefined
    delete data.id;
    return this.salaList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos
    return this.salaList.remove(refKey);
  }

}
