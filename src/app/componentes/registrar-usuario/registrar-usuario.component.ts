import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
  providers: [MessageService, AngularFireStorage]
})
export class RegistrarUsuarioComponent implements OnInit {

  clienteForm: FormGroup;
  submitted: boolean;
  imagen: string;
  horaActual: string;

  constructor(public servUsuario: UsuarioService, public router: Router, public fb: FormBuilder, 
    public messageService: MessageService, private afs: AngularFireStorage) {

  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'clave': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      //'foto': new FormControl('', Validators.required),
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

  ahora(){        
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.horaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  }

  ImagenCargada(e) {

    const img = e.target.files[0];

    try {
      let storageRef = this.afs.storage.ref();
      this.ahora();
      const ext = img.name.substr(img.name.lastIndexOf('.') + 1);
      const nombreArchivo = this.clienteForm.controls["correo"].value + " " + this.horaActual + ext;
      const filePath = "imagenes/usuarios/" + nombreArchivo;
      const imageRef = this.afs.ref(filePath);


      this.afs.upload(filePath, img).then(
        (snapshot) => {
          imageRef.getDownloadURL().toPromise().then(
            (datos) => {
              this.clienteForm.controls["foto"].setValue(datos);
            }
          )
          this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se subió tu foto!' });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
