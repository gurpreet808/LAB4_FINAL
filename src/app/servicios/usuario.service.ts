import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { database } from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public logueado = new BehaviorSubject<boolean>(false);
  firstRun: boolean = true;
  el_usuario = new BehaviorSubject<Usuario>({});
  usuarios: Usuario[] = [];
  empleados: Usuario[] = [];
  clientes: Usuario[] = [];

  usuarioList: AngularFireList<Usuario>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public _http: HttpClient) {
    this.usuarioList = this.db.list<Usuario>('/usuarios');

    this.afAuth.authState.subscribe(
      (authState) => {
        this.firstRun = false;

        if (authState) {
          try {
            this.traerDatosDelUsuario(authState.uid).subscribe(this.el_usuario);

            /* let suscription = this.traerDatosDelUsuario(authState.uid).subscribe(
              (data) => {
                this.el_usuario.next(data);
                suscription.unsubscribe();
                this.logueado.next(true);
              }
            ); */

            this.logueado.next(true);

          } catch (error) {
            console.log(error);
            this.logueado.next(false);
          }
        } else {
          this.logueado.next(false);
          
        }
      }
    );

    this.CargarUsuarios();
  }

  //FALTA Alerts para avisar errores
  async loginEmail(correo: string, clave: string): Promise<{ estado: boolean; info?: string }> {
    let rta: { estado: boolean; info?: string } = {estado: false};

    await this.afAuth.auth.signInWithEmailAndPassword(correo, clave)
      .then(
        (datos) => {
          //console.log(datos);
          rta.estado = true;
        }
      )
      .catch(
        (error) => {
          console.log(error.code);

          rta.info = error.code;
          
          if (error.code == "auth/wrong-password") {
            rta.info = "Clave incorrecta";
          }

          if (error.code == "auth/user-not-found") {
            rta.info = "No se encontró ese mail";
          }

          rta.estado = false;
        }
      );

    return Promise.resolve(rta);
  }

  traerDatosDelUsuario(uid: string): Observable<Usuario> {
    return this.db.object<Usuario>('/usuarios/' + uid).valueChanges();
  }

  //FALTA Alerts para informar errores
  registrarUsuario(usuario: Usuario) {
    let url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf_aefd8nA4q3FWBpr2IXe2J4uBkI_R28";
    let body = {
      email: usuario.correo,
      password: usuario.clave,
      returnSecureToken: true
    };

    this._http.post(url, body).toPromise().then(
      (resp: any) => {
        //console.log(resp);
        //console.log("ID", resp.localId);
        let ID_USER: string = resp.localId;
        console.log(ID_USER);
        usuario.fechaAlta = this.getTimestamp();

        this.modificarUsuario(usuario, ID_USER);
      }
    ).catch(
      (err) => {
        console.log(err);
        //console.log(err.error.error.message);
      }
    );
  }

  //FALTA validar si soy yo o un administrador
  modificarUsuario(usuario: Usuario, uid: string) {
    //Si soy yo mismo
    //else si tengo los privilegios
    usuario.fechaMod = this.getTimestamp();
    usuario = this.IntegridadDeClase(usuario);

    this.db.object<Usuario>('/usuarios/' + uid).set(usuario).then(
      () => {
        console.log("Se modificó el usuario: " + usuario.correo);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.logueado.next(false);
    this.afAuth.auth.signOut();
  }

  getTimestamp(): Object {
    return database.ServerValue.TIMESTAMP;
  }

  TraerTodos() {
    return this.usuarioList.snapshotChanges();
  }

  AgregarUno(elusuario: Usuario) {
    this.registrarUsuario(elusuario);
  }

  ModificarUno(refKey: string, data: Usuario) {
    this.modificarUsuario(data, refKey);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos
    return this.usuarioList.remove(refKey);
  }

  CargarUsuarios() {
    this.TraerTodos().subscribe(
      (usuariosSnapshot: AngularFireAction<DatabaseSnapshot<Usuario>>[]) => {
        this.usuarios = [];
        this.empleados = [];
        this.clientes = [];

        usuariosSnapshot.forEach((usuarioData: AngularFireAction<DatabaseSnapshot<Usuario>>) => {

          //console.log(usuarioData);
          let itemUsuario: Usuario = usuarioData.payload.toJSON();
          itemUsuario.uid = usuarioData.key;
          //console.log(itemUsuario);

          this.usuarios.push(itemUsuario);

          if (itemUsuario.esCliente) {
            //console.log("Cliente", itemUsuario.correo);
            this.clientes.push(itemUsuario);
          }

          if (itemUsuario.tipoEmpleado) {
            //console.log("Empleado", itemUsuario.correo);
            this.empleados.push(itemUsuario);
          }

        });

        //console.log(this.usuarios);
      }
    );
  }

  IntegridadDeClase(usuario: Usuario): Usuario {
    //delete usuario.clave;
    delete usuario.uid;

    if (usuario.tipoEmpleado != "especialista") {
      delete usuario.especialidad;
    }
    //console.log("IntegridadDeClase", usuario);

    return usuario;
  }
}
