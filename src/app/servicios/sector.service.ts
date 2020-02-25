import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Sector } from '../clases/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  sectores: Sector[] = [];
  sectorList: AngularFireList<Sector>;

  constructor(public db: AngularFireDatabase) {
    this.sectorList = this.db.list<Sector>('/sectores');

    this.TraerTodos().subscribe(
      (sectoresSnapshot: AngularFireAction<DatabaseSnapshot<Sector>>[]) => {
        this.sectores = [];

        sectoresSnapshot.forEach((sectorData: AngularFireAction<DatabaseSnapshot<Sector>>) => {

          //console.log(sectorData);
          let itemSector: Sector = sectorData.payload.toJSON();
          itemSector.id = sectorData.key;
          //console.log(itemSector);

          this.sectores.push(itemSector);
        });
        console.log(this.sectores);
      }
    );
  }

  TraerTodos() {
    return this.sectorList.snapshotChanges();
  }

  AgregarUno(elsector: Sector) {
    return this.sectorList.push(elsector);
  }

  ModificarUno(refKey: string, data: Sector) {
    //Limpiar el objeto de datos undefined
    return this.sectorList.update(refKey, data);
  }

  BorrarUno(refKey: string) {
    //Borrado virtual para consistencia de datos

    return this.sectorList.remove(refKey);
  }
}
