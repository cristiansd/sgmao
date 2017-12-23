import { Component, OnInit,Input } from '@angular/core';
import Chart from 'chart.js';
import {DataService } from './data.service';
import {SharingDataService } from './sharingData.service';
import {Parte} from './parte';


@Component({
  selector: 'chart-pie',
  templateUrl: './chartPie.component.html',
  styleUrls: ['./chartPie.component.css'],
  providers:[DataService, SharingDataService]
})
export class MyChartComponent implements OnInit {
  
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
  


  constructor(private dataService: DataService, public sharingData: SharingDataService) {} 

  ngOnInit(): void {
    this.datos[0] = new Array();
    this.datos[1] = new Array();
    this.getPartes(true, '','');
  } 



  clickChart1(evt){
    var activePoints = this.myChart.getElementsAtEvent(evt);
          if(activePoints.length > 0)
            {
              //get the internal index of slice in pie chart
              var clickedElementindex = activePoints[0]["_index"];
              //console.log(clickedElementindex);
              //get specific label by index 
              var label = this.myChart.data.labels[clickedElementindex];
              //console.log(this.label);
              //get value by index      
              var value = this.myChart.data.datasets[0].data[clickedElementindex];
              //console.log(value);
              /* other stuff that requires slice's label and value */
              var color = this.myChart.data.datasets[0].backgroundColor[clickedElementindex];
           }
          this.myChart.data.datasets[0].data.splice(0,this.myChart.data.datasets[0].data.length);
          this.myChart.data.labels.splice(0,this.myChart.data.labels.length);
          this.myChart.data.datasets[0].backgroundColor.splice(0,this.myChart.data.datasets[0].backgroundColor.length);
          this.myChart.data.datasets[0].data.push(value);
          this.myChart.data.labels.push(label);
          this.myChart.data.datasets[0].backgroundColor.push(color);
          
          this.datos[0] = 'recurso';
          this.datos[1] = label;         

          this.destroyCharts();

          this.sharingData.setPrueba(this.datos);
          this.getPartes(false, 'recurso',label);

  }

  clickChart2(evt){
    var activePoints = this.myChart2.getElementsAtEvent(evt);
          if(activePoints.length > 0)
            {
              //get the internal index of slice in pie chart
              var clickedElementindex = activePoints[0]["_index"];
              //console.log(clickedElementindex);
              //get specific label by index 
              var label = this.myChart2.data.labels[clickedElementindex];
              //console.log(this.label);
              //get value by index      
              var value = this.myChart2.data.datasets[0].data[clickedElementindex];
              //console.log(value);
              /* other stuff that requires slice's label and value */
              var color = this.myChart2.data.datasets[0].backgroundColor[clickedElementindex];
           }
          this.myChart2.data.datasets[0].data.splice(0,this.myChart2.data.datasets[0].data.length);
          this.myChart2.data.labels.splice(0,this.myChart2.data.labels.length);
          this.myChart2.data.datasets[0].backgroundColor.splice(0,this.myChart2.data.datasets[0].backgroundColor.length);
          this.myChart2.data.datasets[0].data.push(value);
          this.myChart2.data.labels.push(label);
          this.myChart2.data.datasets[0].backgroundColor.push(color);

          this.datos[0] = 'tipo';
          this.datos[1] = label;         

          this.destroyCharts();

          this.sharingData.setPrueba(this.datos);

          this.getPartes(false, 'tipo',label);

  }

  clickChart3(evt){
    var activePoints = this.myChart3.getElementsAtEvent(evt);
          if(activePoints.length > 0)
            {
              //get the internal index of slice in pie chart
              var clickedElementindex = activePoints[0]["_index"];
              //console.log(clickedElementindex);
              //get specific label by index 
              var label = this.myChart3.data.labels[clickedElementindex];
              //console.log(this.label);
              //get value by index      
              var value = this.myChart3.data.datasets[0].data[clickedElementindex];
              //console.log(value);
              /* other stuff that requires slice's label and value */
              var color = this.myChart3.data.datasets[0].backgroundColor[clickedElementindex];
           }
          this.myChart3.data.datasets[0].data.splice(0,this.myChart2.data.datasets[0].data.length);
          this.myChart3.data.labels.splice(0,this.myChart3.data.labels.length);
          this.myChart3.data.datasets[0].backgroundColor.splice(0,this.myChart3.data.datasets[0].backgroundColor.length);
          this.myChart3.data.datasets[0].data.push(value);
          this.myChart3.data.labels.push(label);
          this.myChart3.data.datasets[0].backgroundColor.push(color);

          this.datos[0] = 'cliente';
          this.datos[1] = label;         

          this.destroyCharts();

          this.sharingData.setPrueba(this.datos);

          this.getPartes(false, 'cliente',label);

  }

  destroyCharts():void{
    this.myChart.destroy();
    this.myChart2.destroy();
    this.myChart3.destroy();
  }

  public getPartes(inicial:boolean, filtro:string, valor:string): void{
    
    this.dataService.getPartes().subscribe((data) => {
        if(this.datosHeredados.length == 0){
          this.datosHeredados.push(data['partes']);          
        }

          switch (filtro) {
           case "recurso":
             this.datosHeredados = this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['total'];
             break;

           case "tipo":
             this.datosHeredados = this.dataService.getPartesPortipo(this.datosHeredados, data,filtro, valor)['total'];
             break;

           case "cliente":
             this.datosHeredados = this.dataService.getPartesPorCliente(this.datosHeredados, data,filtro, valor)['total'];
             break;
         }


          //DESCARGAMOS LOS RECURSOS
          this.partesPorRecuros = this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['partes'];
          this.labelsRecursos = this.dataService.getPartesPorRecurso(this.datosHeredados, data, filtro, valor)['labels'];
          

          //DESCARGAMOS LOS CLIENTES
          this.partesPorCliente = this.dataService.getPartesPorCliente(this.datosHeredados, data, filtro, valor)['partes'];
          this.labelClientes = this.dataService.getPartesPorCliente(this.datosHeredados, data,filtro, valor)['labels'];

          //DESCARGAMOS LOS TIPOS 
          this.partesPorTipo = this.dataService.getPartesPortipo(this.datosHeredados, data,filtro, valor)['partes'];
          this.labelsTipos = this.dataService.getPartesPortipo(this.datosHeredados, data, filtro, valor)['labels']; 


          this.ngAfterViewInit();          
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
          display: false
        },
        responsive: false,
        display:true,
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
  }
}



