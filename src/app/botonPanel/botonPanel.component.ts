import { Component } from '@angular/core';

@Component({
  selector: 'boton-panel',
  templateUrl: './botonPanel.component.html',
  styleUrls: ['./botonPanel.component.css',
  				'../../../node_modules/material-design-icons/iconfont/material-icons.css']
})
export class BotonPanelComponent {
  title = 'app'; 

  clickListButton(evt){
  	var divToChange = document.getElementsByClassName('myChart');
    for (var i = divToChange.length - 1; i >= 0; i--) {
      divToChange[i].style.width = '0px';
      document.getElementById('table').style.display = 'table';
    }
  }

  clickHomeButton(evt){
    var divToChange = document.getElementsByClassName('myChart');
    for (var i = divToChange.length - 1; i >= 0; i--) {
      divToChange[i].style.width = '33.3%';
      document.getElementById('table').style.display = 'table';
    }
  }

  clickPieButton(evt){    
    var divToChange = document.getElementsByClassName('myChart');
    for (var i = divToChange.length - 1; i >= 0; i--) {
      divToChange[i].style.width = '70%';
    }
    document.getElementById('table').style.display = 'none';
    document.getElementById('backgroundGrey').style.minHeight = '';
    document.getElementById('backgroundGrey').style.width = '100%';
  }

  clickToolButton(){
    if(document.getElementById("navPanel2").style.display == "none"){
      document.getElementById("navPanel2").style.display = "block";
    }else{
      document.getElementById("navPanel2").style.display = "none"
    }
  }
}