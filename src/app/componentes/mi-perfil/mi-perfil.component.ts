import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  yo: Usuario;
  mostrarSubir: boolean = true;
  imageFile: any;
  uploadPercent: Observable<number>;
  downloadURL = new BehaviorSubject<string>("");
  horaActual: string;

  constructor(public servUsuario: UsuarioService, private afs: AngularFireStorage) {
    servUsuario.el_usuario.subscribe(
      (_user: Usuario) => {
        this.yo = _user;
      }
    )
  }

  ngOnInit(): void {
  }

  onPreUpload(event) {
    this.imageFile = event.files[0];
  }

  CambiarImagen() {
    console.log("Subo imagen");

    if (this.imageFile) {
      this.subirImagen(this.imageFile);
      this.downloadURL.subscribe(
        (rutaFoto: string) => {
          console.log(rutaFoto);
          if (rutaFoto != "") {

            this.yo.foto = rutaFoto;
            console.log(this.yo);

            //this.servUsuario.modificarUsuario(this.yo, this.servUsuario.el_usuario.value.uid);

            let _user: Usuario = {
              foto: rutaFoto,
              nombre: "Cambiate2"
            };

            //this.servUsuario.modificarUsuario(Object.assign(this.yo, {foto: rutaFoto}), this.yo.uid);

            //this.servUsuario.ModificarUno(this.yo.uid, Object.assign(this.yo, _user));
            //this.servUsuario.ModificarUno(this.yo.uid, Object.assign(this.yo, {foto: rutaFoto}));
          }
        }
      );
    } 

  }

  subirImagen(file) {
    let type: string = file.type;
    type = type.replace("image/", ".");
    let folder = "imagenes/usuarios/";
    let filePath = this.ahoraString() + type;
    filePath = this.yo.nombre + " " + this.yo.apellido + " " + filePath;

    filePath = folder + filePath;

    let fileRef = this.afs.ref(filePath);
    let task = this.afs.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => {
          fileRef.getDownloadURL().subscribe(this.downloadURL);
        }
      )
    ).subscribe();
  }

  ahoraString() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  }

}
