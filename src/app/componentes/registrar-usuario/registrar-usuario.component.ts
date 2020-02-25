import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  clave: string = "";
  clave2: string = "";
  foto: string = "";

  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  ngOnInit(): void {
  }

  loguear() {
    this.navegar("/login");
  }

  registrar() {
    console.log("Usuario", this.correo);
    console.log("Clave", this.clave);

    let user: Usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      clave: this.clave,
      foto: this.foto,
      esCliente: true
    };
    
    this.servUsuario.registrarUsuario(user);
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }

}
