import { Injectable, signal, Signal } from '@angular/core';
import { Country } from './models/Country';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountrysService {
  constructor(private http: HttpClient) {}

  listaNombrePaises(): Observable<string[]> {
    return this.http
      .get<Country[]>('https://restcountries.com/v3.1/all?fields=name')
      .pipe(map((countries) => countries.map((c) => c.name.common)));
  }

  obtenerAleatorio(): Signal<Country | null> {
    console.log('Obteniendo');

    let pais = signal<Country | null>(null);
    this.listaNombrePaises().subscribe((data: string[]) => {
      console.log('Obtenido nombres');
      const pos = Math.floor(Math.random() * data.length);
      this.getPais(data[pos]).subscribe((data: Country) => {
        console.log('Obtenido ' + data.name.common);
        //this.factorizarLanguages(data);
        pais.set(data);
      });
    });

    return pais;
  }

  getPaises(): Observable<Country[]> {
    return this.http.get<Country[]>(
      'https://restcountries.com/v3.1/all?fields=name,flags,region'
    );
  }

  getPais(name: string): Observable<Country> {
    console.log('Recuperando ' + name);
    return this.http
      .get<Country[]>('https://restcountries.com/v3.1/name/' + name)
      .pipe(map((res) => res[0]));
  }

  factorizarLanguages(c: Country) {
    let i = 0;
    for (const clave in c.languages) {
      c.idioms[i].key = clave;
      c.idioms[i++].value = c.languages[clave];
    }
  }

  obtenerContinentes(countries: Country[]): Set<string> {
    let continentes: Set<string> = new Set();
    for (const country of countries) {
      continentes.add(country.region);
    }
    return continentes;
  }
}
