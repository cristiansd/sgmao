import { Pipe, PipeTransform, Input} from '@angular/core';  
import {Parte} from './parte';

@Pipe({  
    name: 'myfilter',  
    pure: false  
}) 
export class MyFilterPipe implements PipeTransform {  

	@Input() filter:string;


    transform(items: any[], filter: Parte): any {  
        if (!items || !filter) {  
            return items;  
        }  
        return items.filter(item => item.recursoParte.indexOf(filter.recursoParte) !== -1);  
    }  
}  
