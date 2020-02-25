import { Component, OnInit } from '@angular/core';
import { Sector } from 'src/app/clases/sector';
import { SectorService } from 'src/app/servicios/sector.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent implements OnInit {

  displayDialog: boolean;
  newSector: boolean;
  selectedSector: Sector;
  cols: any[];

  sector: Sector = {};

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

  constructor(public servSector: SectorService) {

  }

  ngOnInit(): void {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' }
    ];
  }

  showDialogToAdd() {
    this.newSector = true;
    this.sector = {};
    this.displayDialog = true;
  }

  save() {
    if (this.newSector) {
      this.servSector.AgregarUno(this.sector).then(() => {
        console.log('Documento creado exitósamente!');
      }, (error) => {
        console.error(error);
      });
    }
    else {
      this.servSector.ModificarUno(this.sector.id, this.sector).then(() => {
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }

    this.displayDialog = false;
    this.sector = {};
  }

  delete() {
    this.servSector.BorrarUno(this.sector.id).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });

    this.sector = {};
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newSector = false;
    this.sector = this.cloneSector(event.data);
    this.displayDialog = true;
  }

  cloneSector(c: Sector): Sector {
    let sector = {};
    for (let prop in c) {
      sector[prop] = c[prop];
    }
    return sector;
  }

}
