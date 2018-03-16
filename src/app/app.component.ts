import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
  var height = window.screen.height;
  document.getElementById('backgroundGrey').style.minHeight = height.toString() + 'px';
  var center = (window.screen.width-960+50)/2;
  document.getElementById('content').style.marginLeft = center.toString() + 'px';
  //document.getElementById('content').style.marginLeft = '140px';
  }
}
