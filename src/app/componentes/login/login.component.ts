import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;

  usuariosTest = [
    { correo: "administrador@administrador.com", clave: "administrador", label: "Administrador" },
    { correo: "especialista1@especialista.com", clave: "especialista", label: "Esteban Quito (Ortodoncia)" },
    { correo: "especialista2@especialista.com", clave: "especialista", label: "Jazmín Flores (especialista2)" },
    { correo: "cliente1@cliente.com", clave: "cliente", label: "Lautaro López (cliente1)" },
    { correo: "cliente2@cliente.com", clave: "cliente", label: "Camila Rodríguez (cliente2)" },
    { correo: "cliente3@cliente.com", clave: "cliente", label: "Juan Pérez (cliente3)" }
  ];

  constructor(public servUsuario: UsuarioService, public router: Router, public fb: FormBuilder, public messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.servUsuario.logueado.value != false) {
      this.router.navigateByUrl("/");
    }

    this.loginForm = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'clave': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  onSubmit() {
    this.loguear().then(
      (sePudo: {estado: boolean, info?: string}) => {
        console.log(sePudo);

        if (sePudo.estado) {
          this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Ingresó correctamente' });
          let suscripcion = this.servUsuario.logueado.subscribe(
            (logeado: boolean) => {
              if (logeado == true) {
                this.navegar("/");
                suscripcion.unsubscribe();
              }
            }
          );
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: sePudo.info });
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inesperado' });
      }
    );
  }

  texto_error_usuario() {
    return "Se requiere su correo con el formato usuario@dominio.com";
  }

  texto_error_clave() {
    return "Se requiere su clave";
  }

  loguear() {
    //console.log("Usuario", this.loginForm.controls["usuario"].value);
    //console.log("Clave", this.loginForm.controls["clave"].value);

    return this.servUsuario.loginEmail(this.loginForm.controls["usuario"].value, this.loginForm.controls["clave"].value);
  }

  elegirTest(id: number) {
    this.loginForm.controls['usuario'].setValue(this.usuariosTest[id].correo);
    this.loginForm.controls['clave'].setValue(this.usuariosTest[id].clave);
  }

  registrar() {
    this.navegar("/registrarme");
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }

}
