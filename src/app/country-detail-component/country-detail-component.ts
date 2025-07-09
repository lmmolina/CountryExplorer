import { Component, OnInit } from '@angular/core';
import { CountryComponent } from '../country-component/country-component';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../models/Country';
import { CountrysService } from '../countrys-service';

@Component({
  selector: 'app-country-detail-component',
  imports: [CountryComponent],
  templateUrl: './country-detail-component.html',
  styleUrl: './country-detail-component.scss',
})
export class CountryDetailComponent implements OnInit {
  pais!: Country;
  constructor(
    private route: ActivatedRoute,
    private servicio: CountrysService
  ) {}
  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('name');
    this.pais = this.servicio.getPais(name as string);
  }
}
