import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaGuard implements CanActivate {
  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.servUsuario.logueado.value) {
      if (this.servUsuario.el_usuario.value) {
        if (this.servUsuario.el_usuario.value.tipoEmpleado == "especialista") {
          return true;
        }
      }
    }

    console.log("SOLO ESPECIALISTAS");
    this.router.navigateByUrl("/");
    return false;
  }

}
