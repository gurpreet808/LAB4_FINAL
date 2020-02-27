import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  description: string;

  constructor(public servUsuario: UsuarioService, public router: Router, public fb: FormBuilder, public messageService: MessageService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'clave': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  onSubmit() {
    this.submitted = true;
    
    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
  }

  texto_error_usuario(){
    return "Se requiere su correo con el formato usuario@dominio.com";
  }

  texto_error_clave(){
    return "Se requiere su clave";
  }

  loguear() {
    console.log("Usuario", this.loginForm.controls["usuario"].value);
    console.log("Clave", this.loginForm.controls["clave"].value);

    this.servUsuario.loginEmail(this.loginForm.controls["usuario"].value, this.loginForm.controls["clave"].value);
  }

  registrar() {
    this.navegar("/registrarme");
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }

}
