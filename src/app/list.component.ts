import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Subscription, ISubscription} from "rxjs/Subscription";
import {SharingDataService } from './sharingData.service';
import {DataService } from './data.service';
import {Parte} from './parte';
import { OnDestroy } from "@angular/core";
import "rxjs/add/operator/takeWhile";


@Component({
  selector: 'list-ordenes',
  templateUrl: './list.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css','./list.component.css'],
  providers:[DataService]
})
export class listComponent implements OnDestroy, OnInit{

  @Input('texto') order:string;
  valor;
  partes = [];
  pruebaDatas: ISubscription;
  dataSubscripcion:Subscription;
  data = [];
  originalDatas = [];
  filtro;

  ngOnInit(): void {    
      this.getDatas();
      this.sharingData.dataSource$.subscribe(data=>{
      this.filtro = data[0];
      this.valor = data[1];
      //console.log(this.partes);
      this.getDatas();

    });

    }

    ngOnDestroy() {
  this.pruebaDatas.unsubscribe();
  console.log('destroy');
}

    prueba(){
      console.log('esto es la prueba de hover');
    }

    orderBy(order:string):void{
    this.order = order;
  }

    clickRowList(evt){
      console.log('se ha pulsado linea de la lista');
    }


    getFilterPartesRecurso(data:Parte[],recurso:string){
      var partes = [];

      var Recurso = data['recursos'].find(fd=>fd.nombreRecurso === recurso);
      var idRecurso = Recurso.idRecurso;
      partes.push(data['partes'].filter(ft=>ft.recursoParte === idRecurso));
      return partes;
    }


  constructor(public dataService: DataService,private sharingData: SharingDataService) {}  

  getDatas():void{
    if(this.valor === undefined || this.valor === ''){

      this.dataService.getPartes().then((data) => {

          //DESCARGAMOS LOS RECURSOS
            this.partes = data['partes'];
            this.data = data['partes'];
            this.originalDatas = data;
            var descripcionTipoParte = [];
            this.partes.push(descripcionTipoParte);
            for(let i in data['partes']){

            this.partes[i]['recursoParte'] = this.dataService
            .getConversRecursos(data, data['partes'][i]['recursoParte']);

            this.partes[i]['clienteParte'] = this.dataService
            .getConversClientes(data, data['partes'][i]['clienteParte']); 

            this.partes[i]['tipoParte'] = this.dataService
            .getConversTipos(data, data['partes'][i]['tipoParte']); 

            /*this.partes[i]['descripcionTipoParte'] = this.dataService
            .getConversDescripcionTipos(data, data['partes'][i]['tipoParte']); */

            this.partes[i]['otParte'] =  parseInt(this.partes[i]['otParte']);              
            }
    },
      (error) => {
          console.log(error);
      });
      }

      else{      
      

      switch (this.filtro) {

              case "recurso":

                var partes = this.dataService.getFilterPartesRecurso(this.originalDatas, this.data,this.valor);
                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(this.originalDatas, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(this.originalDatas, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(this.originalDatas, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0]; 
                this.data = this.partes; 


              break;

              case "tipo":

                var partes = this.dataService.getFilterPartesTipo(this.originalDatas, this.data, this.valor);

                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(this.originalDatas, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(this.originalDatas, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(this.originalDatas, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0];  
                this.data = this.partes; 

              break;

              case "cliente":

                var partes = this.dataService.getFilterPartesCliente(this.originalDatas, this.data, this.valor);

                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(this.originalDatas, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(this.originalDatas, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(this.originalDatas, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0];  
                this.data = this.partes; 
                
              break;
            }     
          }

     
        }             

      }  