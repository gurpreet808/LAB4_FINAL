import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MenuItem } from 'primeng/api/menuitem';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(public servUsuario: UsuarioService, public router: Router) {
    servUsuario.el_usuario.subscribe(
      (_user: Usuario) => {

        this.items = [];

        if (servUsuario.logueado.value) {
          if (servUsuario.el_usuario.value) {
            switch (servUsuario.el_usuario.value.tipoEmpleado) {
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

          if (servUsuario.el_usuario.value.esCliente == true) {
            this.items.push({
              label: 'Mis turnos',
              icon: 'pi pi-fw pi-calendar',
              routerLink: 'mis-turnos'
            });
            this.items.push({
              label: 'Nuevo turno',
              icon: 'pi pi-fw pi-calendar-plus',
              routerLink: 'solicitar-turno'
            });
          }
        }

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
