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

  items: MenuItem[] = [];

  constructor(public servUsuario: UsuarioService, public router: Router) {
    servUsuario.logueado.subscribe(
      (logged_in) => {

        this.items = [];

        setTimeout(() => {
          if (logged_in == true) {
            if (servUsuario.el_usuario.tipoEmpleado != undefined) {
              switch (servUsuario.el_usuario.tipoEmpleado) {
                case "administrador":
                  this.items = [
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
                  break;
  
                case "recepcionista":
                  this.items = [
                    {
                      label: 'Turnos',
                      icon: 'pi pi-fw pi-calendar',
                      routerLink: 'turnos'
                    }
                  ];
                  break;
  
                case "especialista":
                  this.items = [
                    {
                      label: 'Turnos a atender',
                      icon: 'pi pi-fw pi-calendar',
                      routerLink: 'atender-turnos'
                    }
                  ];
                  break;
  
                default:
                  break;
              }
            }
  
            if (servUsuario.el_usuario.esCliente == true) {
              this.items.push({
                label: 'Mis turnos',
                icon: 'pi pi-fw pi-calendar',
                routerLink: 'mis-turnos'
              });
            }
          }
        }, 800);

      }
    );
  }

  ngOnInit(): void {
  }

  desloguear() {
    console.log("Cerrando sesión...");

    this.router.navigateByUrl("/");
    this.servUsuario.logout();
  }


}
