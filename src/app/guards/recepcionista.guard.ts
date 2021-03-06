import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaGuard implements CanActivate {
  constructor(public servUsuario: UsuarioService, public router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.servUsuario.logueado.value) {
      if (this.servUsuario.el_usuario.value) {
        if (this.servUsuario.el_usuario.value.tipoEmpleado == "recepcionista" || this.servUsuario.el_usuario.value.tipoEmpleado == "administrador") {
          return true;
        }
      }
    }

    console.log("SOLO RECEPCIONISTA");
    this.router.navigateByUrl("/");
    return false;
  }
}
