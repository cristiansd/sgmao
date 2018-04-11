import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  	constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  		iconRegistry.addSvgIcon(
        	'modificar',
        	sanitizer.bypassSecurityTrustResourceUrl('../assets/guardar.svg'));
	}

  ngOnInit() {}  

}