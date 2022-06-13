import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'fa-solid fa-house',
      routerLink: '/'
    },
    {
      label: 'Salas',
      icon: 'fa-solid fa-hospital',
      routerLink: 'salas'
    },
    {
      label: 'Especialidades',
      icon: 'fa-solid fa-briefcase-medical',
      routerLink: 'especialidades'
    },
    {
      label: 'Empleados',
      icon: 'fa-solid fa-users',
      routerLink: 'empleados'
    },
    {
      label: 'Turnos',
      icon: 'fa-solid fa-calendar-days',
      routerLink: 'turnos'
    },
    {
      label: 'Mi perfil',
      icon: 'fa-solid fa-user-pen',
      routerLink: 'mi-perfil'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
