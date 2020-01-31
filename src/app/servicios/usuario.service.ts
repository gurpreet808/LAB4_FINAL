import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public _http: HttpClient) {
    this.afAuth.authState.subscribe(
      (authState) => {
        if (authState) {
          this.logueado.next(true);
          this.traerDatosDelUsuario(authState.uid);
        } else {
          this.logueado.next(false);
        }
      }
    );
  }

  loginEmail(correo: string, clave: string) {
    try {
      this.afAuth.auth.signInWithEmailAndPassword(correo, clave);
    } catch (error) {
      console.log(error.code);
      if (error.code == "auth/wrong-password") {
        console.log("Clave incorrecta");
      }
      if (error.code == "auth/user-not-found") {
        console.log("No se encontró ese mail");
      }
    }
  }

  traerDatosDelUsuario(uid: string) {
    try {
      let usuarioQuery = this.db.object('/usuarios/' + uid).valueChanges().subscribe(
        (usuario: Usuario) => {
          this.el_usuario = usuario;
          console.log(this.el_usuario);
          usuarioQuery.unsubscribe();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  registrarUsuario(usuario: Usuario) {
    let url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf_aefd8nA4q3FWBpr2IXe2J4uBkI_R28";
    let body = {
      email: usuario.correo,
      password: usuario.clave,
      returnSecureToken: true
    };

    let options;

    
    this._http.post(url, body, options).toPromise().then(
      (resp: any) => {
        //console.log(resp);
        //console.log("ID", resp.localId);
        let ID_USER: string = resp.localId;
        console.log(ID_USER);

        this.modificarUsuario(usuario, ID_USER);
      }
    ).catch(
      (err) => {
        console.log(err);
        //console.log(err.error.error.message);
      }
    );
  }

  modificarUsuario(usuario: Usuario, uid: string){
    //Si soy yo mismo
    //else si tengo los privilegios
    this.db.object('/usuarios/' + uid).set(usuario).then(
      (resp) => {
        console.log(resp);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
