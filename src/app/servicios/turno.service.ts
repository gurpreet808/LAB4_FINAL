import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { AngularFireList, AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turnos: Turno[] = [];
  turnoList: AngularFireList<Turno>;

  constructor(public db: AngularFireDatabase) {
    this.turnoList = this.db.list<Turno>('/turnos');

    this.TraerTodos().subscribe(
      (turnosSnapshot: AngularFireAction<DatabaseSnapshot<Turno>>[]) => {
        this.turnos = [];

        turnosSnapshot.forEach((turnoData: AngularFireAction<DatabaseSnapshot<Turno>>) => {

          //console.log(turnoData);
          let itemTurno: Turno = turnoData.payload.toJSON();
          itemTurno.id = turnoData.key;
          itemTurno.fecha = new Date(itemTurno.fecha);
          //console.log(itemTurno);

          this.turnos.push(itemTurno);
        });
        console.log(this.turnos);
      }
    );
  }

  TraerTodos() {
    return this.turnoList.snapshotChanges();
  }

  AgregarUno(elturno: Turno) {
    return this.turnoList.push(elturno);
  }

  ModificarUno(refKey: string, data: Turno) {
    //Limpiar el objeto de datos undefined
    return this.turnoList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos

    return this.turnoList.remove(refKey);
  }
}