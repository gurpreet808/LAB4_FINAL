import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionEmpresaService {

  configEmpresa;
  sectorList: AngularFireObject<any>;

  constructor(public db: AngularFireDatabase) {
    this.sectorList = this.db.object<any>('/configEmpresa');

    this.TraerTodo().subscribe(
      (config: any) => {
        this.configEmpresa = config;
        console.log(this.configEmpresa);
      }
    );
  }

  TraerTodo() {
    return this.sectorList.valueChanges();
  }

  Modificar() {
    //Limpiar el objeto de datos undefined
    return this.sectorList.update(this.configEmpresa);
  }
}
