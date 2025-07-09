import { Component, OnInit } from '@angular/core';
import { CountrysService } from '../countrys-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit {
  private nombres!: string[];
  sugerencias: string[] = [];
  busqueda: string = '';
  constructor(private servicio: CountrysService) {}
  ngOnInit() {
    this.servicio.cargarPaises();
    this.nombres = this.servicio.listaNombrePaises();
  }
  AutoCompletar() {
    if (this.busqueda.length >= 3) {
      this.sugerencias = this.nombres.filter((nom) =>
        nom.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    } else {
      this.sugerencias = [];
    }
  }
  Seleccionar(texto: string) {
    this.busqueda = texto;
    this.sugerencias = [];
  }
}
