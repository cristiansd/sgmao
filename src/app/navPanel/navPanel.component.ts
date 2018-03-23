import { Component } from '@angular/core';

import { BotonPanelComponent } from '../botonPanel/botonPanel.component';
import { Module } from '../module';
import { ModuleService } from '../module.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'nav-panel',
  templateUrl: './navPanel.component.html',
  styleUrls: ['./navPanel.component.css'],    
  providers: [ModuleService]   
})


export class NavPanelComponent implements OnInit {

	  my_note = [
  {id:1, title:'Note 1', description: 'Description for Note 1'},
  {id:2, title:'Note 2', description: 'Description for Note 2'},
  {id:3, title:'Note 3', description: 'Description for Note 3'},
  {id:4, title:'Note 4', description: 'Description for Note 4'}
  ]


	ngOnInit(): void {
		this.getModules();
	}

	selectedModule: Module;
	modules: Module[];

	constructor(private moduleService: ModuleService) { }

	getModules(): void {
  		this.modules = this.moduleService.getModules();
	}

	/*onSelect(module: Module): void {
  		this.selectedModule = module;
	}*/

}
