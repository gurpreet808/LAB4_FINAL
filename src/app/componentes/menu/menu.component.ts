import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      label: 'Listado',
      icon: 'pi pi-fw pi-list',
      routerLink: 'listado'
    },
    {
      label: 'Quit', icon: 'pi pi-fw pi-times'
    }
  ];

  constructor(public servUsuario: UsuarioService) {

  }

  desloguear(){
    console.log("Cerrando sesión...");
    this.servUsuario.logout();
  }
}