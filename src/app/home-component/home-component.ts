import { Component, OnInit } from '@angular/core';
import { CountrysService } from '../countrys-service';
import { Country } from '../models/Country';
import { CountryComponent } from "../country-component/country-component";

@Component({
  selector: 'app-home-component',
  imports: [CountryComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  pais!: Country;
  constructor(private servcio: CountrysService) {}
  ngOnInit(): void {
    this.servcio.cargarPaises();
    this.pais = this.servcio.obtenerAleatorio();
  }
}
