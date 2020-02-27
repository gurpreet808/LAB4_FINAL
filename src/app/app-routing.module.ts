import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { Error404Component } from './componentes/error404/error404.component';
import { RegistrarUsuarioComponent } from './componentes/registrar-usuario/registrar-usuario.component';
import { SalasComponent } from './componentes/salas/salas.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TablaEspecialidadesComponent } from './componentes/tabla-especialidades/tabla-especialidades.component';
import { TablaEmpleadosComponent } from './componentes/tabla-empleados/tabla-empleados.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { ConfiguracionEmpresaComponent } from './componentes/configuracion-empresa/configuracion-empresa.component';
import { AdminGuard } from './guards/admin.guard';
import { RecepcionistaGuard } from './guards/recepcionista.guard';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "registrarme", component: RegistrarUsuarioComponent },
  { path: "salas", component: SalasComponent, canActivate: [AdminGuard] },
  { path: "especialidades", component: TablaEspecialidadesComponent, canActivate: [AdminGuard] },
  { path: "empleados", component: TablaEmpleadosComponent, canActivate: [AdminGuard] },
  { path: "turnos", component: TablaTurnosComponent, canActivate: [RecepcionistaGuard] },
  { path: "configEmpresa", component: ConfiguracionEmpresaComponent, canActivate: [AdminGuard] },
  { path: "usuarios", component: TablaUsuariosComponent },
  //{ path:"registrarme", component: RegistrarUsuarioComponent, canActivate: [AnonGuard] },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
