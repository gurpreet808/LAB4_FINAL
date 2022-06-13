import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  loading: boolean = false;
  readonly url_logo: string = "assets/imagenes/logo.png";

  constructor() { }

  show() {
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }

  toogle() {
    this.loading = !this.loading;
  }
}
