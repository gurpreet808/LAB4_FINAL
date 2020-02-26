import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PanelModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    CardModule,
    TableModule,
    DropdownModule,
    CalendarModule
  ],
  exports: [
    PanelModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    InputTextareaModule,
    CardModule,
    TableModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PrimeNGModule { }
