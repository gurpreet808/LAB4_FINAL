import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  clave2: string;
  foto: string;
  cuil: number;
  perfil: string;

  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  ngOnInit() {
  }

  loguear() {
    this.navegar("/login");
  }
  
  registrar() {
    console.log("Usuario", this.correo);
    console.log("Clave", this.clave);
  
    //this.servUsuario.loginEmail(this.correo, this.clave);
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }
}
