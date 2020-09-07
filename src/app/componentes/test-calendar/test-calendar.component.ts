import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-calendar',
  templateUrl: './test-calendar.component.html',
  styleUrls: ['./test-calendar.component.css']
})
export class TestCalendarComponent implements OnInit {
  mi_fecha: Date;
  minDateValue: Date = new Date(Date.now());

  dia: number = -1;
  hora: number = -1;
  minutos: number = -1;

  valido: boolean = false;

  es = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: 'Hoy',
    clear: 'Vaciar',
    dateFormat: 'mm/dd/yy',
    weekHeader: 'Sem'
  };

  constructor() {
    console.log(this.isOpenNow());
    this.valido = this.isOpenNow();
  }

  ngOnInit(): void {
  }
  
  isOpenNow(): boolean {
    if (this.mi_fecha) {
      this.dia = this.mi_fecha.getDay();
      this.hora = this.mi_fecha.getHours();
      this.minutos = this.mi_fecha.getMinutes();

      //Domingo
      if (this.dia == 0) {
        return false;
      }

      //De L a V
      if (this.dia >= 1 && this.dia <= 5) {
        if (this.hora >= 8 && this.minutos >= 0) {
          if (this.hora <= 18 && this.minutos <= 59) {
            return true;
          }
        }
      }

      //Sabado
      if (this.dia == 6) {
        if (this.hora >= 8 && this.minutos >= 0) {
          if (this.hora <= 13 && this.minutos <= 59) {
            return true;
          }
        }
      }

    }

    return false;
  }

  cambioFecha() {
    this.valido = this.isOpenNow();
  }


  setearDia() {
    console.log(this.mi_fecha.setDate(this.mi_fecha.getDate() + 1));
  }

}
