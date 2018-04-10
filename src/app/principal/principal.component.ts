import { Component, OnInit } from '@angular/core';
import {MyChartComponent} from '../chartPie/chartPie.component';
import {TimeSelectorComponent} from '../time-selector/timeSelector.component';
import {listComponent} from '../list/list.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
