import { Component, OnInit } from '@angular/core';
import { CountrysService } from '../countrys-service';
import { Country } from '../models/Country';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-list-component',
  imports: [RouterModule, FormsModule],
  templateUrl: './country-list-component.html',
  styleUrl: './country-list-component.scss',
})
export class CountryListComponent implements OnInit {
  flags: Country[] = [];
  filtroContinente: string = '';
  filtroIdioma: string = '';
  continentes!: string[];

  constructor(private servicio: CountrysService, private route: Router) {}

  ngOnInit(): void {
    this.servicio.getPaises().subscribe((data: Country[]) => {
      this.flags = data;
      this.continentes = Array.from(this.servicio.obtenerContinentes(data));
    });
  }

  enlazarPais(pais: string) {
    this.route.navigate(['pais/' + pais]);
  }

  obtenerPaisesFiltrados() {
    return this.flags.filter(
      (p) =>
        (!this.filtroContinente || p.region == this.filtroContinente) &&
        (!this.filtroIdioma || p.idioms.some((l) => l.key == this.filtroIdioma))
    );
  }
}
