import { Component,Input} from '@angular/core';
import {DataService } from './data.service';


@Component({
  selector: 'nav-bar',
  templateUrl: './navBar.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css'],
  providers:[DataService]
})

export class navBarComponent {

	public order: string;
	@Input()recurso: string;

	constructor(private dataService: DataService) {}
  	
	orderBy(order:string):void{
		this.order = order;
	}

}
