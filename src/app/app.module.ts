import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firebaseConfig } from './app.firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from './modulos/prime-ng/prime-ng.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { Error404Component } from './componentes/error404/error404.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SalasComponent } from './componentes/salas/salas.component';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { TablaEmpleadosComponent } from './componentes/tabla-empleados/tabla-empleados.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TablaEspecialidadesComponent } from './componentes/tabla-especialidades/tabla-especialidades.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { ConfiguracionEmpresaComponent } from './componentes/configuracion-empresa/configuracion-empresa.component';
import { TurnoFormMinutosPipe } from './pipes/turno-form-minutos.pipe';
import { CantidadTurnosDisponiblesPipe } from './pipes/cantidad-turnos-disponibles.pipe';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    Error404Component,
    RegistrarUsuarioComponent,
    InicioComponent,
    TurnosComponent,
    SalasComponent,
    PedirTurnoComponent,
    TablaEmpleadosComponent,
    TablaTurnosComponent,
    TablaEspecialidadesComponent,
    TablaUsuariosComponent,
    ConfiguracionEmpresaComponent,
    TurnoFormMinutosPipe,
    CantidadTurnosDisponiblesPipe,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    PrimeNGModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
