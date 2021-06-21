import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'squareMetricMiles'})
export class SquareMetricMilesPipe implements PipeTransform {
    transform(value: number): string {
        if (value === null || value === undefined) return '0';
        
        return (value * 0.386102).toString().split('.')[0];
    }
}
