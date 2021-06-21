import { Component } from '@angular/core';
import { CountriesService } from './countries.service';
import { Country } from './country';
import { Language } from "./language";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Countries';
  
  countries: Country[] = [];
  languages: Language[] = [];

  constructor(private service: CountriesService) {}

  ngOnInit() {
    this.service.getCountries().subscribe(countries => {
      this.countries = countries;
      this.createLanguagesData();
    });
  }

  private createLanguagesData(): void {
    let allLanguages: Language[] = this.getAllLanguages(this.countries);
    let unique: Language[] = this.getUniqueLanguages(allLanguages);

    unique.map(lang => {
      allLanguages.forEach(toMatch => {
        if (toMatch !== undefined && toMatch !== null && lang.name === toMatch.name) {
          if (lang.countries.findIndex(e => e === toMatch.countries[0]) === -1) {
          lang = this.updateLanguage(lang, toMatch);
          }
        }
      })
    })

    this.languages = unique;
  }

  private getUniqueLanguages(languages: Language[]): Language[] {
    return Array.from(new Set(languages.map(i => i.name)))
    .map(name => {
      return languages.find(y => y.name === name)
    })
  }

  private getAllLanguages(countries: Country[]): Language[] {
    let list: Language[] = []; 

    countries.forEach(country => {
      country.languages.forEach(language => list.push(this.createLanguage(language, country)));
    })

    return list;
  }

  private createLanguage(inputLanguage: any, inputCountry: Country): Language {
    return {
      iso639_1: inputLanguage.iso639_1,
      iso639_2: inputLanguage.iso639_2,
      name: inputLanguage.name,
      nativeName: inputLanguage.nativeName,
      countries: [inputCountry.name],
      population: inputCountry.population
    }
  }

  private updateLanguage(output: Language, input: Language): Language {
    if (input.countries) output.countries = output.countries.concat(input.countries);
    if (input.population) output.population += input.population;

    return output;
  }

  getPopulationAverage(): number {
    if (this.countries.length <= 0) return null;

    let sum = 0;
    
    this.countries.forEach(c => sum += c.population);

    return sum / (this.countries.length - 1);
  }

  getSmallestArea(): string {
    if (this.countries.length <= 0) return null;

    let smallest = this.countries[0];

    this.countries.forEach(country => {
      if (smallest.area > country.area) smallest = country;
    });

    return smallest.name;
  }

  getLargestArea(): string {
    if (this.countries.length <= 0) return null;

    let largest = this.countries[0];

    this.countries.forEach(country => {
      if (largest.area < country.area) largest = country;
    });

    return largest.name;
  }

  sortTableString(table, col) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(table);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first and last three, which contains table headers and footers): */
      for (i = 1; i < (rows.length - 4); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[col];
        y = rows[i + 1].getElementsByTagName("TD")[col];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  sortTableNumber(table, col) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(table);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[col];
        y = rows[i + 1].getElementsByTagName("TD")[col];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
