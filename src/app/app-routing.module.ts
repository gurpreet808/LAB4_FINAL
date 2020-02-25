import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { Error404Component } from './componentes/error404/error404.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { SectoresComponent } from './componentes/sectores/sectores.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TablaEspecialidadesComponent } from './componentes/tabla-especialidades/tabla-especialidades.component';
import { TablaEmpleadosComponent } from './componentes/tabla-empleados/tabla-empleados.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { ConfiguracionEmpresaComponent } from './componentes/configuracion-empresa/configuracion-empresa.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "registrarme", component: RegistrarUsuarioComponent },
  { path: "sectores", component: SectoresComponent },
  { path: "turnos", component: TablaTurnosComponent },
  { path: "especialidades", component: TablaEspecialidadesComponent },
  { path: "empleados", component: TablaEmpleadosComponent },
  { path: "usuarios", component: TablaUsuariosComponent },
  { path: "configEmpresa", component: ConfiguracionEmpresaComponent },
  //{ path:"registrarme", component: RegistrarUsuarioComponent, canActivate: [AnonGuard] },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
