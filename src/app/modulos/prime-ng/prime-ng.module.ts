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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';

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
    CalendarModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    SplitButtonModule
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
    CalendarModule,
    MessagesModule,
    MessageModule,
    FileUploadModule,
    SplitButtonModule
  ]
})
export class PrimeNGModule { }
