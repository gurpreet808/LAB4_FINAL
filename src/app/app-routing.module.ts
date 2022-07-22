import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './componentes/error404/error404.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { TablaEspecialidadesComponent } from './componentes/tabla-especialidades/tabla-especialidades.component';
import { TablaSalasComponent } from './componentes/tabla-salas/tabla-salas.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "salas", component: TablaSalasComponent },
  { path: "especialidades", component: TablaEspecialidadesComponent },
  { path: "empleados", component: TablaUsuariosComponent },
  //{ path: "registrarme", component: RegistrarUsuarioComponent },
  //{ path: "especialidades", component: TablaEspecialidadesComponent, canActivate: [AdminGuard] },
  //{ path:"registrarme", component: RegistrarUsuarioComponent, canActivate: [AnonGuard] },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
