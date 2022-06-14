import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNGModule } from './modulos/prime-ng/prime-ng.module';

//import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
//import { provideAuth, getAuth } from '@angular/fire/auth';
//import { provideDatabase, getDatabase } from '@angular/fire/database';
//import { provideFirestore, getFirestore } from '@angular/fire/firestore';
//import { provideFunctions, getFunctions } from '@angular/fire/functions';
//import { provideMessaging, getMessaging } from '@angular/fire/messaging';
//import { provideStorage, getStorage } from '@angular/fire/storage';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { LoginComponent } from './componentes/login/login.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { TablaSalasComponent } from './componentes/tabla-salas/tabla-salas.component';
import { TablaEspecialidadesComponent } from './componentes/tabla-especialidades/tabla-especialidades.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error404Component,
    LoginComponent,
    SpinnerComponent,
    NavBarComponent,
    TablaSalasComponent,
    TablaEspecialidadesComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    PrimeNGModule
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
