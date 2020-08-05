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
import { SolicitarTurnoComponent } from './componentes/solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { AdminGuard } from './guards/admin.guard';
import { RecepcionistaGuard } from './guards/recepcionista.guard';
import { EspecialistaGuard } from './guards/especialista.guard';
import { AuthGuard } from './guards/auth.guard';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "login", component: LoginComponent },
  { path: "registrarme", component: RegistrarUsuarioComponent },
  { path: "registrar-usuario", component: RegistrarUsuarioComponent },
  { path: "salas", component: SalasComponent, canActivate: [AdminGuard] },
  { path: "especialidades", component: TablaEspecialidadesComponent, canActivate: [AdminGuard] },
  { path: "empleados", component: TablaEmpleadosComponent, canActivate: [AdminGuard] },
  { path: "turnos", component: TablaTurnosComponent, canActivate: [RecepcionistaGuard] },
  { path: "mis-turnos", component: MisTurnosComponent, canActivate: [AuthGuard] },
  { path: "solicitar-turno", component: SolicitarTurnoComponent, canActivate: [AuthGuard] },
  { path: "atender-turnos", component: TurnosComponent, canActivate: [EspecialistaGuard] },
  { path: "configEmpresa", component: ConfiguracionEmpresaComponent, canActivate: [AdminGuard] },
  { path: "usuarios", component: TablaUsuariosComponent },
  { path: "mi-perfil", component: MiPerfilComponent },
  //{ path:"registrarme", component: RegistrarUsuarioComponent, canActivate: [AnonGuard] },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
