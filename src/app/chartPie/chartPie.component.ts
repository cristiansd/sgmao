import { Component, OnInit, Input, AfterViewInit} from '@angular/core';
import Chart from 'chart.js';
import {DataService } from '../data.service';
import {SharingDataService } from '../sharingData.service';
import {Parte} from '../parte';
import { ISubscription } from "rxjs/Subscription";


@Component({
  selector: 'chart-pie',
  templateUrl: './chartPie.component.html',
  styleUrls: ['./chartPie.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.css'],
  providers:[DataService]
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
  partesPorEstado = [];
  labelEstados = [];
  label;
  @Input() filter:string = 'prueba';
  data=[];
  public recurso:string;
  activePoints:string;
  myChart;
  myChart2;
  myChart3;
  myChart4;
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
  private descripcionTipo = [];
  private varChart = [];
  fromDate:string;
  toDate:string;
  private subscription: ISubscription;
  message:string;

  constructor( private dataService: DataService, private sharingData: SharingDataService) {
  } 

  ngOnInit(): void {
    console.log('metodo ngOnInit chartPie.component.ts'); 
    this.getPartes(true, '','');  
    this.onSubcription();      
  } 

  private onSubcription(){
    this.subscription = this.sharingData.dataSource$.subscribe(res=>{         
        console.log("llamada a sharing datas");
        if(res['fromDate'] !== undefined || res['fromDate'] !== ''){
          this.fromDate = res['fromDate'];
          this.toDate = res['toDate'];        
          this.dataService.setPartesFilterDate(this.fromDate, this.toDate);
          
          this.getPartes(true, '',''); 
        }        
      }); 
  }

  private clickNext(){
     console.log("metodo clickNext");      
     var display = document.getElementById("myChart").style.display;
     switch (display) {       
       case "block":
         document.getElementById("myChart").style.display = "none";
         document.getElementById("myChart4").style.display = "block";   
         this.createCanvas("myChart4");   
         this.myChart4 = this.createChart(this.labelEstados, this.partesPorEstado, "partes por estado");
         break;
     }     
   } 


  private clickPrevious(){
    console.log("metodo clickPrevious");    
    document.getElementById("myChart").style.display = "block";  
    document.getElementById("myChart4").style.display = "none";
  }

  private createCanvas(elementChart:string){
    console.log("metodo createCanvas");
         this.canvas = document.getElementById(elementChart);
         this.ctx = this.canvas.getContext('2d');
  }

  private createChart(labels, datas, title:string){
    console.log("metodo createChart");
      if(varChart == undefined ){
         var varChart = new Chart(this.ctx, {
         type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: '# of Votes',
              data: datas,
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
            text: title
          }
        }
        });
         return varChart;
       }
        
  }

  private destroyCharts():void{
    console.log('metodo destroyCharts');
    this.myChart.destroy();
    this.myChart2.destroy();
    this.myChart3.destroy();   
    /*this.subscription.unsubscribe();
    console.log(this.subscription.closed);*/
  }

  private isFiltrado():boolean{
    console.log("metodo isFiltrado");
    if(!this.filtrado) {
        this.filtrado = true;
        document.getElementById('butonRestart').style.display = '';
    }
    return this.filtrado;
  } 

  restartClick(){
    console.log("metodo restartClick");
    location.reload(); 
    /*this.datos.splice(0); 
    this.ngOnInit();    
    this.filtrado = false;
    document.getElementById('butonRestart').style.display = 'none'*/
  }

  private mesureDiv(idDiv:string):number[]{
    console.log("metodo mesureDiv");
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
    document.getElementById('myChart4').style.display = 'none';
    document.getElementById('content4').style.height = "auto";
    document.getElementById(idDiv).style.display = '';
    document.getElementById(idDiv).style.width = '100%';
    document.getElementById(idDiv).style.height = '100%';
    document.getElementById(idDiv).style.margin = '0 auto';
    var screenWidth = window.screen.height; 
    var chartWidth = this.mesureDiv(idDiv)['width'];
    var totalPadding = screenWidth - chartWidth;
    var leftMargin = totalPadding/2 + 70;    
  }

  private restoreChart(idDiv:string):void{
  console.log('metodo restoreChart, div: ' + idDiv);  
    //this.destroyCharts();    
    document.getElementById('myChart').style.display = '';
    document.getElementById('myChart2').style.display = '';
    document.getElementById('myChart3').style.display = '';
    document.getElementById('myChart4').style.display = '';
    document.getElementById('myChart').style.width = this.chartWidht + 'px';
    document.getElementById('myChart2').style.width = this.chartWidht + 'px';
    document.getElementById('myChart3').style.width = this.chartWidht + 'px';
    document.getElementById('myChart4').style.width = this.chartWidht + 'px';
    document.getElementById('myChart').style.height = this.chartHeight + 'px';
    document.getElementById('myChart2').style.height = this.chartHeight + 'px';
    document.getElementById('myChart3').style.height = this.chartHeight + 'px';
    document.getElementById('myChart4').style.height = this.chartHeight + 'px';
    document.getElementById('myChart').style.marginLeft = '';
    document.getElementById('myChart2').style.marginLeft = '';
    document.getElementById('myChart3').style.marginLeft = '';
    document.getElementById('myChart4').style.marginLeft = '';
    document.getElementById(idDiv).style.marginTop = '50px';
    //document.getElementById(idDiv).style.width = this.chartWidht + 'px';
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
    
    console.log('el width de ' + idDiv + ' es ' + this.chartWidht);
    switch (this.isBig) {
      case false:
        this.chartWidht = document.getElementById(idDiv).clientWidth;
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

  private dblClickChart1(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart');

    
  }

  private dblClickChart2(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart2');
    
  }

  private dblClickChart3(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart3');
    
  }

  private dblClickChart4(evt){

    this.evt = evt.type;

    this.changeIsBig('myChart4');
    
  }



  private clickChart1(evt){

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

          document.getElementById('myChart4').style.display = 'none';

          this.getPartes(false, 'recurso',label); 

          this.isFiltrado();

          this.sharingData.setDatas(this.datos); 
      }

    },500);

  }

   private clickChart2(evt){

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

        document.getElementById('myChart4').style.display = 'none';

        this.getPartes(false, 'tipo',label);

        this.isFiltrado(); 

        this.sharingData.setDatas(this.datos); 

      }

    },500);  

  }

  private clickChart3(evt){

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

        document.getElementById('myChart4').style.display = 'none';

        this.getPartes(false, 'cliente',label);

        this.isFiltrado();  

        this.sharingData.setDatas(this.datos);

      }

    },500);  

  }

  private clickChart4(evt){

    this.evt = evt.type;

    setTimeout(() => { 

      if(this.evt != 'dblclick'){

        var activePoints = this.myChart4.getElementsAtEvent(evt);

        if(activePoints.length > 0){
          var clickedElementindex = activePoints[0]["_index"];
          var label = this.myChart4.data.labels[clickedElementindex];
          var value = this.myChart4.data.datasets[0].data[clickedElementindex];
          var color = this.myChart4.data.datasets[0].backgroundColor[clickedElementindex];
        }

        this.datos[0] = 'estado';
        this.datos[1] = label;         

        this.destroyCharts();

        this.holdChartMesure('myChart4');

        this.myChart4.destroy(); 

        document.getElementById('myChart4').style.display = 'none';

        this.getPartes(false, 'estado',label);               

        this.isFiltrado();  

        this.sharingData.setDatas(this.datos);

      }

    },500);  

  }

 

  public getPartes(inicial:boolean, filtro:string, valor:string): void{

    console.log("metodo getPartes()");
    /*if(this.subscription.closed)
      this.onSubcription();*/
   this.dataService.getPartes().then((response) => {var data = response.json();
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
             case "estado":
             this.datosHeredados = this.dataService.getPartesPorEstado(this.datosHeredados, data,filtro, valor)['total'];
             this.datos['filtro'] = 'estado';
             break;
         }
          this.partesPorRecuros = [];
          this.partesPorEstado = [];
          this.partesPorTipo = [];
          this.partesPorCliente = [];


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
          this.descripcionTipo = this.dataService.getPartesPortipo(this.datosHeredados, data, filtro, valor)['descripcion']; 

          //DESCARGAMOS LOS ESTADOS
          this.partesPorEstado = this.dataService.getPartesPorEstado(this.datosHeredados, data,filtro, valor)['partes'];
          this.labelEstados = this.dataService.getPartesPorEstado(this.datosHeredados, data, filtro, valor)['labels']; 

          this.ngAfterViewInit();

          if(this.datosHeredados.length == 0){
            this.datosHeredados.push(data['partes']);   
          }else{
            this.datos['heredados'] = this.datosHeredados[0]; 
          }          

          this.datos['original'] = data;

          //this.sharingData.setPrueba(this.datos);    

      },
      (error) => {
          console.log(error);
      });
  }
  
  ngAfterViewInit(): void {   
    this.createCanvas("myChart");
    this.myChart = this.createChart(this.labelsRecursos, this.partesPorRecuros, "partes por recursos");
    this.createCanvas("myChart2"); 
    this.myChart2 = this.createChart(this.labelsTipos, this.partesPorTipo, "partes por tipo");
    this.createCanvas("myChart3"); 
    this.myChart3 = this.createChart(this.labelClientes, this.partesPorCliente, "partes por cliente");
    if(this.myChart4 !== undefined){
      this.clickNext();
    }     
  }
}




