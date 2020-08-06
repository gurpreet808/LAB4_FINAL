import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/clases/sala';
import { SalaService } from 'src/app/servicios/sala.service';
import { MessageService } from 'primeng/api';

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

  en_usos = [
    { label: 'Seleccionar', value: null },
    { label: 'Si', value: true },
    { label: 'No', value: false }
  ];

  constructor(public servSala: SalaService, public messageService: MessageService) {

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
      { field: 'en_uso', header: '¿En uso?' }
    ];
  }

  showDialogToAdd() {
    this.newSala = true;
    this.sala = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newSala) {
      console.log(this.sala);
      if (this.sala.nombre && this.sala.tipo && this.sala.estado) {
        this.sala.en_uso = false;
        this.servSala.AgregarUno(this.sala).then(
          () => {
            this.messageService.add({ severity: 'success', summary: '¡Bien!', detail: 'Se enviaron los datos' });
            this.displayDialog = false;
            this.sala = {};
          }
        ).catch(
          (error) => {
            console.error(error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se guardaron los datos' });
          }
        );
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete todos los datos' });
      }
    } else {
      this.servSala.ModificarUno(this.sala.id, this.sala).then(() => {
        console.log('Documento editado exitósamente');
        this.displayDialog = false;
        this.sala = {};
      }, (error) => {
        console.log(error);
      });
    }
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
