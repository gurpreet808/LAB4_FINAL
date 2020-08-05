import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  yo: Usuario;

  constructor(public servUsuario:UsuarioService) {
    servUsuario.el_usuario.subscribe(
      (_user:Usuario) => {
        this.yo = _user;
      }
    )
  }

  ngOnInit(): void {
  }

}
