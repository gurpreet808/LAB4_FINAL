import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/clases/sala';
import { SalaService } from 'src/app/servicios/sala.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  displayDialog: boolean;
  newSala: boolean;
  selectedSala: Sala;
  cols: any[];

  sala: Sala = {};

  tipos = [
    { label: 'Seleccionar', value: null },
    { label: 'Consultorio', value: "consultorio" },
    { label: 'Laboratorio', value: "laboratorio" }
  ];

  estados = [
    { label: 'Seleccionar', value: null },
    { label: 'Activo', value: "activo" },
    { label: 'Inactivo', value: "inactivo" },
    { label: 'Borrado', value: "borrado" },
    { label: 'En construcción', value: "en_construccion" }
  ];

  constructor(public servSala: SalaService) {

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' }
    ];
  }

  showDialogToAdd() {
    this.newSala = true;
    this.sala = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newSala) {
      this.servSala.AgregarUno(this.sala).then(() => {
        console.log('Documento creado exitósamente!');
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.servSala.ModificarUno(this.sala.id, this.sala).then(() => {
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }

    this.displayDialog = false;
    this.sala = {};
  }

  delete() {
    this.servSala.BorrarUno(this.sala.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.sala = {};
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newSala = false;
    this.sala = this.cloneSala(event.data);
    this.displayDialog = true;
  }

  cloneSala(c: Sala): Sala {
    let sala = {};
    for (let prop in c) {
      sala[prop] = c[prop];
    }
    return sala;
  }

}
