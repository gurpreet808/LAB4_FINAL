import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public router: Router, public servUsuario: UsuarioService) { }

  ngOnInit(): void {
  }

  navegar(url: string){
    this.router.navigateByUrl(url);
  }

}
