import { Component, OnInit } from '@angular/core';
import { ConfiguracionEmpresaService } from 'src/app/servicios/configuracion-empresa.service';

@Component({
  selector: 'app-configuracion-empresa',
  templateUrl: './configuracion-empresa.component.html',
  styleUrls: ['./configuracion-empresa.component.css']
})
export class ConfiguracionEmpresaComponent implements OnInit {

  constructor(public servConfigEmpresa: ConfiguracionEmpresaService) { 
    
  }

  ngOnInit(): void {
  }

}
