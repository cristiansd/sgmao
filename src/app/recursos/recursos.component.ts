import { Component, OnInit} from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./recursos.component.css']
})
export class RecursosComponent implements OnInit{
	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		console.log('onInit recursos.component');
		this.dataService.getRecursos().then((response) => {
			var data = response.json();
		});
	}
}  