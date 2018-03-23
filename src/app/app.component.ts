import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
 /* var screenHeight = window.screen.height;
  var screenWidht = window.screen.width;
  var backgroundGreyWidht = document.getElementById('backgroundGrey');
  var contentDiv = document.getElementById('content');
  var content1Div = document.getElementById('content1');
  var chartContent = document.getElementById('chartContent');
  var myChart = document.getElementById('myChart');
  contentDiv.style.width = screenWidht - 100 + 'px';
  contentDiv.style.marginLeft = '70px';
  /*chartContent.style.width = 'auto'
  chartContent.style.height = 'auto';*/
  }
}
