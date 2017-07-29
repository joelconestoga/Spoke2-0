import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
    transform(value: any, args: any, exact?: boolean): any {
        if(args && Array.isArray(value)) {
            let keys = Object.keys(args);
            if(exact) {
                return value.filter(item => keys.reduce((key, name) => key || item[name].toString().toLowerCase() === args[name].toString().toLowerCase(), false));
            } else {
                return value.filter(item => keys.reduce((key, name) => key || !args[name] || item[name].toString().toLowerCase().includes(args[name].toString().toLowerCase()), false));
            }
        }
        return value;
    }
}