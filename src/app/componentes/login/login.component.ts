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

  correo: string;
  clave: string;

  userform: FormGroup;
  submitted: boolean;
  description: string;

  constructor(public servUsuario: UsuarioService, public router: Router, public fb: FormBuilder, public messageService: MessageService) {

  }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'usuario': new FormControl('', Validators.required),
      'clave': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
    console.log(value);
    this.messageService.add({ severity: 'info', summary: '¡Bien!', detail: 'Se enviaron los datos' });
  }

  loguear() {
    console.log("Usuario", this.correo);
    console.log("Clave", this.clave);

    this.servUsuario.loginEmail(this.correo, this.clave);
  }

  registrar() {
    this.navegar("/registrarme");
  }

  navegar(url: string) {
    this.router.navigateByUrl(url);
  }

}
