import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Country } from './country';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private countriesUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }
}
