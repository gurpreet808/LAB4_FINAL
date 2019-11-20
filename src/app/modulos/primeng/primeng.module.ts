import { NgModule } from '@angular/core';

import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    PanelModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MenubarModule,
    ChartModule,
    ToastModule,
    DialogModule,
    CardModule
  ],
  exports: [
    PanelModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MenubarModule,
    ChartModule,
    ToastModule,
    DialogModule,
    CardModule
  ]
})
export class PrimeNGModule { }
