import { Component, OnInit} from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./recursos.component.css']
})
export class RecursosComponent implements OnInit{
	private recursos = [];
	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		console.log('onInit recursos.component');
		this.dataService.getDatas('recursos').then((response) => {
			var data = response.json();
			this.recursos = data['recursos'];
			console.log(this.recursos);
		});
	}
}  