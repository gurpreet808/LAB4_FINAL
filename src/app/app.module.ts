import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from "./modulos/primeng/primeng.module";

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { TableComponent } from './dashboard/components/table/table.component';
import { MenubarComponent } from './dashboard/components/menubar/menubar.component';
import { PolarAreaChartComponent } from './dashboard/components/polar-area-chart/polar-area-chart.component';
import { DoughnutChartComponent } from './dashboard/components/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './dashboard/components/radar-chart/radar-chart.component';
import { PieChartComponent } from './dashboard/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './dashboard/components/line-chart/line-chart.component';
import { BarChartComponent } from './dashboard/components/bar-chart/bar-chart.component';

import { MenuComponent } from './componentes/menu/menu.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { Error404Component } from './componentes/error404/error404.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';

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
    Error404Component,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    //AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
