import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  providers: [MessageService, AngularFireStorage]
})
export class RegistrarUsuarioComponent implements OnInit {

  clienteForm: FormGroup;
  submitted: boolean;
  horaActual: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  imageFile: any;

  constructor(public servUsuario: UsuarioService, public router: Router, public fb: FormBuilder,
    public messageService: MessageService, private afs: AngularFireStorage) {

  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'clave': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'foto': new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.registrar();
    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
  }

  loguear() {
    this.navegar("/login");
  }

  registrar() {
    let user: Usuario = this.clienteForm.value;

    user.esCliente = true;

    this.servUsuario.registrarUsuario(user);

    this.clienteForm.reset();

    if (this.servUsuario.logueado.value == false) {
      this.loguear();
    }
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }

  texto_error_apellido() {
    return "Se requiere el apellido";
  }

  texto_error_nombre() {
    return "Se requiere el nombre";
  }

  texto_error_correo() {
    return "Se requiere el correo con el formato usuario@dominio.com";
  }

  texto_error_clave() {
    return "Se requiere la clave";
  }

  ahoraString() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  }

  subirImagen(event) {
    let file = event.target.files[0];
    let type: string = event.target.files[0].type;
    type = type.replace("image/", ".");
    let folder = "imagenes/usuarios/";
    let filePath = this.ahoraString() + type;
    if (this.clienteForm.controls['nombre'].value) {
      filePath = this.clienteForm.controls['nombre'].value + " " + filePath;
    }

    filePath = folder + filePath;

    let fileRef = this.afs.ref(filePath);
    let task = this.afs.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(
        () => {
          this.downloadURL = fileRef.getDownloadURL();
        }
      )
    ).subscribe();
  }

  onPreUpload(event) {
    console.log(event);
    this.imageFile = event.files;
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
