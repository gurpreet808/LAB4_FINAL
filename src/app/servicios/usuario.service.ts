import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;
  
  constructor() { }
}
