import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelModule } from 'primeng/panel';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableComponent } from './dashboard/components/table/table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarComponent } from './dashboard/components/menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { PolarAreaChartComponent } from './dashboard/components/polar-area-chart/polar-area-chart.component';
import { ChartModule } from 'primeng/chart';
import { DoughnutChartComponent } from './dashboard/components/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './dashboard/components/radar-chart/radar-chart.component';
import { PieChartComponent } from './dashboard/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './dashboard/components/line-chart/line-chart.component';
import { ToastModule } from 'primeng/toast';
import { BarChartComponent } from './dashboard/components/bar-chart/bar-chart.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { Error404Component } from './componentes/error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    TableComponent,
    MenubarComponent,
    PolarAreaChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    LineChartComponent,
    BarChartComponent,
    MenuComponent,
    InicioComponent,
    LoginComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PanelModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MenubarModule,
    ChartModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
