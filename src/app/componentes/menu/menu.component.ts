import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Salas',
      icon: 'pi pi-fw pi-home',
      routerLink: 'salas'
    },
    {
      label: 'Especialidades',
      icon: 'pi pi-fw pi-briefcase',
      routerLink: 'especialidades'
    },
    {
      label: 'Empleados',
      icon: 'pi pi-fw pi-users',
      routerLink: 'empleados'
    },
    {
      label: 'Turnos',
      icon: 'pi pi-fw pi-calendar',
      routerLink: 'turnos'
    }
  ];

  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  ngOnInit(): void {
  }

  desloguear() {
    console.log("Cerrando sesión...");

    this.router.navigateByUrl("/");
    this.servUsuario.logout();
  }


}
