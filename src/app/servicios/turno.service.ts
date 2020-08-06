import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { AngularFireList, AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  turnos: Turno[] = [];

  turnosParaAtender: Turno[] = [];
  turnosParaAtender_hoy: Turno[] = [];
  misTurnos: Turno[] = [];
  misTurnos_hoy: Turno[] = [];

  turnoList: AngularFireList<Turno>;

  constructor(public db: AngularFireDatabase, public servUsuario: UsuarioService) {
    this.turnoList = this.db.list<Turno>('/turnos', ref => ref.orderByChild('fecha'));

    this.TraerTodos().subscribe(
      (turnosSnapshot: AngularFireAction<DatabaseSnapshot<Turno>>[]) => {
        this.turnos = [];
        this.turnosParaAtender = [];
        this.misTurnos = [];

        //turnosSnapshot = turnosSnapshot.reverse();

        turnosSnapshot.forEach((turnoData: AngularFireAction<DatabaseSnapshot<Turno>>) => {

          //console.log(turnoData);
          let itemTurno: Turno = turnoData.payload.toJSON();
          itemTurno.id = turnoData.key;
          itemTurno.fecha = new Date(itemTurno.fecha);
          //console.log(itemTurno);

          this.turnos.push(itemTurno);

          /* if (this.servUsuario.el_usuario) {
            if (itemTurno.especialista_uid == this.servUsuario.afAuth.auth.currentUser.uid) {
              this.turnosParaAtender.push(itemTurno);
            }

            if (itemTurno.cliente_uid == this.servUsuario.afAuth.auth.currentUser.uid) {
              this.misTurnos.push(itemTurno);
            }
          } */

          this.separarTurnos();
        });
        console.log(this.turnos);
      }
    );

    this.servUsuario.el_usuario.subscribe(
      () => {
        this.separarTurnos();
      }
    );

  }

  separarTurnos() {
    this.turnosParaAtender = [];
    this.misTurnos = [];

    this.turnos.forEach(
      (_turno: Turno) => {
        if (this.servUsuario.el_usuario) {
          if (_turno.especialista_uid == this.servUsuario.afAuth.auth.currentUser.uid) {
            this.turnosParaAtender.push(_turno);
          }

          if (_turno.cliente_uid == this.servUsuario.afAuth.auth.currentUser.uid) {
            this.misTurnos.push(_turno);
          }
        }
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