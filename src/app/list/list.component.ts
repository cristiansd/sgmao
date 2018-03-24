import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Subscription, ISubscription} from "rxjs/Subscription";
import {SharingDataService } from '../sharingData.service';
import {DataService } from '../data.service';
import {Parte} from '../parte';
import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";


@Component({
  selector: 'list-ordenes',
  templateUrl: './list.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css','./list.component.css'],
  providers:[DataService,SharingDataService]
})
export class listComponent implements OnDestroy, OnInit{ 

  @Input('texto') order:string;
  valor;
  partes = [];
  pruebaDatas: ISubscription;
  subscripcion:Subscription;
  data = [];
  originalDatas = [];
  filtro;

  message:string;

 

    ngOnInit(): void {    
      this.getDatas();
      this.sharingData.currentMessage.subscribe(message => this.message = message);
      console.log(this.message);

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


  constructor(public dataService: DataService, private sharingData: SharingDataService) {
    /*sharingData.dataSource$.subscribe(data=>{
        console.log('servicio sharingData');
        this.filtro = data[0];
        this.valor = data[1];
        //console.log(this.partes);
        this.getDatas();
      });*/

      /*this.subscripcion = this.sharingData.dataSource$.subscribe(message => { this.message = message; 
      console.log('subscripction activado');
      console.log(this.message);
      });*/
      
      
  }  




  getDatas():void{
    if(this.valor === undefined || this.valor === ''){
      console.log()
      //DESCARGAMOS LOS RECURSOS

      this.dataService.getPartes().then((response) => {var data = response.json();
        this.partes = data['partes'];
        this.data = data['partes'];
        this.originalDatas = data;
        var descripcionTipoParte = [];
        for (var i = 0;i < data['partes'].length; i++) {
            this.partes[i]['recursoParte'] = this.dataService
            .getConversRecursos(data, data['partes'][i]['recursoParte']);

            this.partes[i]['clienteParte'] = this.dataService
            .getConversClientes(data, data['partes'][i]['clienteParte']); 

            this.partes[i]['tipoParte'] = this.dataService
            .getConversTipos(data, data['partes'][i]['tipoParte']); 

            /*this.partes[i]['descripcionTipoParte'] = this.dataService
            .getConversTipos(data, data['partes'][i]['tipoParte']); */
        }
      })
    }

      else{      
      

      switch (this.filtro) {

              case "recurso":

                var partes = this.dataService.getFilterPartesRecurso(this.originalDatas, this.data,this.valor);
                console.log(partes[0]);
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