import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionEmpresaService {

  configEmpresa;
  salaList: AngularFireObject<any>;

  constructor(public db: AngularFireDatabase) {
    this.salaList = this.db.object<any>('/configEmpresa');

    this.TraerTodo().subscribe(
      (config: any) => {
        this.configEmpresa = config;
        console.log(this.configEmpresa);
      }
    );
  }

  TraerTodo() {
    return this.salaList.valueChanges();
  }

  Modificar() {
    //Limpiar el objeto de datos undefined
    return this.salaList.update(this.configEmpresa);
  }
}
