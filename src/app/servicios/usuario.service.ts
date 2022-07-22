import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { SpinnerService } from './spinner.service';
import firebase from 'firebase/compat/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  logueado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  usuarioList: AngularFireList<Usuario> = this.db.list<Usuario>('/usuarios', ref => ref.orderByChild("nombre"));

  constructor(private db: AngularFireDatabase, public servSpinner: SpinnerService, public _http: HttpClient) {
    this.CargarDatos();
  }

  toogleLogueado() {
    this.logueado.next(!this.logueado.value);
  }

  logIn() {
    this.toogleLogueado();
  }

  logOut() {
    this.toogleLogueado();
  }


  TraerTodos() {
    return this.usuarioList.snapshotChanges();
  }

  CargarDatos() {
    this.servSpinner.loading = true;

    this.TraerTodos().subscribe(
      (usuariosSnapshot: AngularFireAction<DatabaseSnapshot<Usuario>>[]) => {
        this.servSpinner.loading = true;
        /* this.usuarios = usuariosSnapshot.map(
          (usuarioData: AngularFireAction<DatabaseSnapshot<Usuario>>) => {
            //console.log(usuarioData);
            let itemUsuario: Usuario = (usuarioData.payload.toJSON() as Usuario);
            itemUsuario.id = usuarioData.key!;

            if (itemUsuario.fotos) {
              itemUsuario.fotos = Object.values((itemUsuario.fotos as Object));
            }

            return itemUsuario;
          }
        ); */

        this.usuarios.next(
          usuariosSnapshot.map(
            (usuarioData: AngularFireAction<DatabaseSnapshot<Usuario>>) => {
              //console.log(usuarioData);
              let itemUsuario: Usuario = (usuarioData.payload.toJSON() as Usuario);
              itemUsuario.uid = usuarioData.key!;

              return itemUsuario;
            }
          )
        );

        this.servSpinner.loading = false;
        console.log(this.usuarios.value);
      }
    );
  }

  async AgregarUno(_usuario: Usuario) {
    let url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf_aefd8nA4q3FWBpr2IXe2J4uBkI_R28";
    let body = {
      email: _usuario.correo,
      password: _usuario.clave,
      returnSecureToken: true
    };

    this._http.post(url, body).toPromise().then(
      async (resp: any) => {
        //console.log(resp);
        //console.log("ID", resp.localId);
        let ID_USER: string = resp.localId;
        console.log(ID_USER);
        _usuario.fechaAlta = this.getTimestamp();
        _usuario.fechaMod = this.getTimestamp();

        return await this.ModificarUno(ID_USER, _usuario);
      }
    ).catch(
      (err) => {
        console.log(err);
        //console.log(err.error.error.message);
      }
    );
  }

  ModificarUno(refKey: string, data: Usuario) {
    //Limpiar el objeto de datos undefined
    delete data.uid;
    data.fechaMod = this.getTimestamp();
    return this.usuarioList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos
    return this.usuarioList.remove(refKey);
  }

  getTimestamp() {
    //return firebase.firestore.FieldValue.serverTimestamp();
    return firebase.database.ServerValue.TIMESTAMP;
    //return firebase.firestore.Timestamp.now().toDate();
  }

}
