/*import { Component} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'time-selector',
  templateUrl: './timeSelector.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./timeSelector.component.css']
})
export class TimeSelectorComponent {    
	model;  
}*/

import {Component} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {SharingDataService } from '../sharingData.service';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'time-selector',
  templateUrl: './timeSelector.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./timeSelector.component.css']})

export class TimeSelectorComponent {

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  datos = [];

  constructor(calendar: NgbCalendar, private sharingData: SharingDataService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  clickCalendar(){
  	if(document.getElementById("calendar").style.display == 'none'){
  	document.getElementById("calendar").style.display = "inline-block";
  }else{
  	document.getElementById("calendar").style.display = "none";
  }
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      this.datos[0] = JSON.stringify(this.toDate['day']);
      console.log(this.datos[0]);
      this.sharingData.setDatas(this.datos); 
    } else {
      this.toDate = null;
      this.fromDate = date;
    }    
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}
