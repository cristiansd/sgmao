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
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./timeSelector.component.css', '../../../node_modules/material-design-icons/iconfont/material-icons.css']})

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
      this.datos['fromDate'] = (JSON.stringify(this.fromDate['year']) + "-" 
        + JSON.stringify(this.fromDate['month']) + "-" 
        + JSON.stringify(this.fromDate['day']));

      this.datos['toDate'] = (JSON.stringify(this.toDate['year']) + "-"
        + JSON.stringify(this.toDate['month']) + "-"
        + JSON.stringify(this.toDate['day']));

      console.log(this.datos['fromDate']);
      this.sharingData.setDatas(this.datos); 
      document.getElementById("calendar").style.display = "none"; 
    } else {
      this.toDate = null;
      this.fromDate = date;
    }    
  }

  onDblClick(){
    console.log('evento doble click');
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}
