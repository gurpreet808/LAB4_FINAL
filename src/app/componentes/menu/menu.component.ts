import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

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
}