import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import Chart from 'chart.js';
import {DataService } from './data.service';
import {SharingDataService } from './sharingData.service';
import {Parte} from './parte';


@Component({
  selector: 'chart-pie',
  templateUrl: './chartPie.component.html',
  styleUrls: ['./chartPie.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.css'],
  providers:[DataService, SharingDataService]
})
export class MyChartComponent implements OnInit, AfterViewInit {
  
  canvas: any;
  ctx: any;
  partes:Parte[] = [];
  partesPorCliente = [];
  labelClientes = [];
  partesPorRecuros = [];
  labelsRecursos = [];
  partesPorTipo = [];
  labelsTipos = [];
  label;
  @Input() filter:string = 'prueba';
  data=[];
  public recurso:string;
  activePoints:string;
  myChart;
  myChart2;
  myChart3;
  datas = [];
  datos = [];
  datosHeredados = [];
  service;
  percent;
  private filtrado = false;
  private isBig = false;
  private evt;
  private chartWidht;
  private chartHeight;



  

  constructor( private dataService: DataService, public sharingData: SharingDataService) {
  } 

  ngOnInit(): void {
    this.getPartes(true, '','');    
  } 


  private destroyCharts():void{
    console.log('metodo destroyCharts');
    this.myChart.destroy();
    this.myChart2.destroy();
    this.myChart3.destroy();
  }

  private isFiltrado():boolean{
    if(!this.filtrado) {
        this.filtrado = true;
        document.getElementById('butonRestart').style.display = '';
    }
    return this.filtrado;
  } 

  restartClick(){
    location.reload(); 
    /*this.datos.splice(0); 
    this.ngOnInit();    
    this.filtrado = false;
    document.getElementById('butonRestart').style.display = 'none'*/
  }

  private mesureDiv(idDiv:string):number[]{
    var mesure = [];
    mesure['width'] = document.getElementById(idDiv).clientWidth;
    mesure['height'] = document.getElementById(idDiv).clientHeight;
    return mesure;
  }

  private centeredChart(idDiv:string):void{    
    console.log('metodo centeredChart, div: ' + idDiv);
    document.getElementById('myChart').style.display = 'none';
    document.getElementById('myChart2').style.display = 'none';
    document.getElementById('myChart3').style.display = 'none';
    document.getElementById(idDiv).style.display = '';
    document.getElementById(idDiv).style.width = '100%';
    document.getElementById(idDiv).style.height = '100%';
    var screenWidth = window.screen.height; 
    var chartWidth = this.mesureDiv(idDiv)['width'];
    var totalPadding = screenWidth - chartWidth;
    var leftMargin = totalPadding/2 + 70;
    document.getElementById(idDiv).style.marginLeft = leftMargin.toString() + 'px';
  }

  private restoreChart(idDiv:string):void{
  console.log('metodo restoreChart, div: ' + idDiv);
    //this.destroyCharts();    
    document.getElementById('myChart').style.display = '';
    document.getElementById('myChart2').style.display = '';
    document.getElementById('myChart3').style.display = '';
    this.canvas.width = this.chartWidht + 'px';
    document.getElementById('myChart2').style.width = this.chartWidht + 'px';
    document.getElementById('myChart3').style.width = this.chartWidht + 'px';
    document.getElementById('myChart').style.height = this.chartHeight + 'px';
    document.getElementById('myChart2').style.height = this.chartHeight + 'px';
    document.getElementById('myChart3').style.height = this.chartHeight + 'px';
  }

  private holdChartMesure(idDiv:string):void{
    console.log('metodo holdChartMesure, div: ' + idDiv);
    if(this.isBig){
      this.centeredChart(idDiv);
    } else {
      this.restoreChart(idDiv);  
    }
  }

  private changeIsBig(idDiv:string):void{
    console.log('metodo changeIsBig, div: ' + idDiv);
    console.log('el valor de isBig es:' + this.isBig);
    switch (this.isBig) {
      case false:
        this.isBig = true;
        this.centeredChart(idDiv);
      break;
      
      case true:
        this.isBig = false;
        this.restoreChart(idDiv);
      break;
    }
  }

  prueba(evt){
    console.log('prueba de hover');
  }

  dblClickChart1(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart');

    
  }

  dblClickChart2(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart2');
    
  }

  dblClickChart3(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart3');
    
  }



  clickChart1(evt){

    this.evt = evt.type;
    
    setTimeout(() => { 

      if(this.evt != 'dblclick'){

        var activePoints = this.myChart.getElementsAtEvent(evt);

          if(activePoints.length > 0){
            var clickedElementindex = activePoints[0]["_index"];
            var label = this.myChart.data.labels[clickedElementindex];
            var value = this.myChart.data.datasets[0].data[clickedElementindex];
            var color = this.myChart.data.datasets[0].backgroundColor[clickedElementindex];
          }
          
          this.datos[0] = 'recurso';
          this.datos[1] = label;         

          this.destroyCharts();

          this.holdChartMesure('myChart');

          this.getPartes(false, 'recurso',label); 

          this.isFiltrado();
      }

    },500);

  }

  clickChart2(evt){

    this.evt = evt.type;

    setTimeout(() => { 

      if(this.evt != 'dblclick'){

        var activePoints = this.myChart2.getElementsAtEvent(evt);

        if(activePoints.length > 0){
          var clickedElementindex = activePoints[0]["_index"];
          var label = this.myChart2.data.labels[clickedElementindex];
          var value = this.myChart2.data.datasets[0].data[clickedElementindex];
          var color = this.myChart2.data.datasets[0].backgroundColor[clickedElementindex];
       };

        this.datos[0] = 'tipo';
        this.datos[1] = label;         

        this.destroyCharts();

        this.holdChartMesure('myChart2');

        this.getPartes(false, 'tipo',label);

        this.isFiltrado(); 

      }

    },500);  

  }

  clickChart3(evt){

    this.evt = evt.type;

    setTimeout(() => { 

      if(this.evt != 'dblclick'){

        var activePoints = this.myChart3.getElementsAtEvent(evt);

        if(activePoints.length > 0){
          var clickedElementindex = activePoints[0]["_index"];
          var label = this.myChart3.data.labels[clickedElementindex];
          var value = this.myChart3.data.datasets[0].data[clickedElementindex];
          var color = this.myChart3.data.datasets[0].backgroundColor[clickedElementindex];
        }

        this.datos[0] = 'cliente';
        this.datos[1] = label;         

        this.destroyCharts();

        this.holdChartMesure('myChart3');

        this.getPartes(false, 'cliente',label);

        this.isFiltrado();  

      }

    },500);  

  }

 

  public getPartes(inicial:boolean, filtro:string, valor:string): void{
   this.dataService.getPartes().then(data=>{
    //   this.service = this.dataService.getPartes() 


          switch (filtro) {

           case "recurso":
             this.datosHeredados = this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['total'];
             this.datos['filtro'] = 'recurso';
             break;

           case "tipo":
             this.datosHeredados = this.dataService.getPartesPortipo(this.datosHeredados, data,filtro, valor)['total'];
             this.datos['filtro'] = 'tipo';
             break;

           case "cliente":
             this.datosHeredados = this.dataService.getPartesPorCliente(this.datosHeredados, data,filtro, valor)['total'];
             this.datos['filtro'] = 'cliente';
             break;
         }


          //DESCARGAMOS LOS RECURSOS
          this.partesPorRecuros = 
          this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['partes'];
          
          this.labelsRecursos = 
          this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['labels'];

          //DESCARGAMOS LOS CLIENTES
          this.partesPorCliente = this.dataService.getPartesPorCliente(this.datosHeredados, data, filtro, valor)['partes'];
          this.labelClientes = this.dataService.getPartesPorCliente(this.datosHeredados, data,filtro, valor)['labels'];

          //DESCARGAMOS LOS TIPOS 
          this.partesPorTipo = this.dataService.getPartesPortipo(this.datosHeredados, data,filtro, valor)['partes'];
          this.labelsTipos = this.dataService.getPartesPortipo(this.datosHeredados, data, filtro, valor)['labels']; 


          this.ngAfterViewInit();  

          if(this.datosHeredados.length == 0){
            this.datosHeredados.push(data['partes']);   
          }else{
            this.datos['heredados'] = this.datosHeredados[0]; 
          }          

          this.datos['original'] = data;

          this.sharingData.setPrueba(this.datos);    

      },
      (error) => {
          console.log(error);
      });
  }
  
  ngAfterViewInit() {     

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.labelsRecursos,
          datasets: [{
              data: this.partesPorRecuros,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'                 
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend:{
          display: false,
        },
        responsive: false,
        display:false,
        title: {
          position: 'bottom',
            display: true,
            text: 'Parte por recursos'
        }
      }
    });
    this.canvas = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');

    this.myChart2 = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.labelsTipos,
          datasets: [{
              label: '# of Votes',
              data: this.partesPorTipo,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display:false
        },
        responsive: false,
        display:true,
        title: {
          position: 'bottom',
            display: true,
            text: 'Partes por tipos'
        }
      }
    });



    this.canvas = document.getElementById('myChart3');
    this.ctx = this.canvas.getContext('2d');
    this.myChart3= new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: this.labelClientes,
          datasets: [{
              label: '# of Votes',
              data: this.partesPorCliente,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend:{
          display:false
        },
        responsive: false,
        display:true,
        title: {
          position: 'bottom',
            display: true,
            text: 'Partes por clientes'
        }
      }
    });

    this.chartHeight = this.canvas.clientHeight;
    this.chartWidht = this.canvas.clientWidth;
    console.log('altura myChart: ' + this.chartHeight + 'anchura myChart: ' + this.chartWidht);
}
}



