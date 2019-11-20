import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  clave: string;

  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  ngOnInit() {
  }

  loguear(){
    console.log("Usuario", this.correo);
    console.log("Clave", this.clave);

    this.servUsuario.loginEmail(this.correo, this.clave);
  }

  registrar(){
    this.navegar("/registrarse");

  }

  navegar(url: string){
    this.router.navigateByUrl(url);
  }

}
