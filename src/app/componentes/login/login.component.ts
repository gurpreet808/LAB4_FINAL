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

  usuariosTest = [
    {correo: "administrador@administrador.com", clave: "administrador"},
    {correo: "recepcionista@recepcionista.com", clave: "recepcionista"},
    {correo: "especialista1@especialista.com", clave: "especialista"},
    {correo: "especialista2@especialista.com", clave: "especialista"},
    {correo: "especialista3@especialista.com", clave: "especialista"},
    {correo: "especialista4@especialista.com", clave: "especialista"},
    {correo: "cliente1@cliente.com", clave: "cliente"},
    {correo: "cliente1@cliente.com", clave: "cliente"},
    {correo: "cliente1@cliente.com", clave: "cliente"}
  ];

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
    this.loguear();
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
    this.navegar("/");
  }

  elegirTest(id:number){
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
