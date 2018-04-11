import { Component, OnInit } from '@angular/core';
import {DataService } from '../data.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {

	private tipos = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  	console.log('onInit tipos.component');
		this.dataService.getDatas('tipos').then((response) => {
			var data = response.json();
			this.tipos = data['tipoParte'];
			console.log(this.tipos);
		});
  }

}
