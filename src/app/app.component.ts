import { Component } from '@angular/core';
import { EspecialidadService } from './servicios/especialidad.service';
import { SalaService } from './servicios/sala.service';
import { SpinnerService } from './servicios/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FinalLab4';

  constructor(public servSpinner: SpinnerService, public servEspecialidades: EspecialidadService, public servSalas: SalaService) {
  }
}
