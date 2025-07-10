import { Component, OnInit } from '@angular/core';
import { CountrysService } from '../countrys-service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  constructor(private servicio: CountrysService, private route: Router) {}
  ngOnInit() {
    this.servicio.listaNombrePaises().subscribe((data: string[]) => {
      this.nombres = data;
    });
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
    this.route.navigate(['pais/' + texto]);
  }
  Buscar() {
    let enc = this.nombres.find((nom) =>
      nom.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    if (enc == null) {
      alert('Pais no encontrado.');
    } else {
      this.route.navigate(['pais/' + enc]);
    }
  }
}
