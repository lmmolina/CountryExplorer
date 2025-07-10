import { Component, effect, OnInit, Signal, signal } from '@angular/core';
import { CountrysService } from '../countrys-service';
import { Country } from '../models/Country';
import { CountryComponent } from '../country-component/country-component';

@Component({
  selector: 'app-home-component',
  imports: [CountryComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  paisSingal: Signal<Country | null>;
  pais!: Country;
  constructor(private servcio: CountrysService) {
    this.paisSingal = this.servcio.obtenerAleatorio();
    effect(() => {
      console.log('Ejecuta');

      let c = this.paisSingal();
      if (c) {
        this.pais = c;
        console.log('Cambia');
      }
    });
  }
}
