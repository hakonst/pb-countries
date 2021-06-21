import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'population'})
export class PopulationPipe implements PipeTransform {
    transform(value: number): string {
        if (value === null || value === undefined) return '0.0';

        const values = (value/1000000).toString().split('.');

        return values.length > 1 ? values[0] + '.' + values[1].substring(0,1) : '0.0';
    }
}
