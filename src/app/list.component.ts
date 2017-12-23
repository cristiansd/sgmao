import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Subscription} from "rxjs/Subscription";
import {SharingDataService } from './sharingData.service';
import {DataService } from './data.service';

@Component({
  selector: 'list-ordenes',
  templateUrl: './list.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css','./list.component.css'],
  providers:[DataService]
})
export class listComponent implements OnInit{

  @Input('texto') order:string;
  valor;
  partes = [];
  dataSubscripcion:Subscription;
  data = [];
  filtro;

	ngOnInit(): void {
		this.getPartes();
    this.sharingData.dataSource$.subscribe(data=>{this.data = data
      this.filtro = this.data[0];
      this.valor = this.data[1];
      this.getPartes();
      this.getDatas();
    });
	}


	constructor(public dataService: DataService,private sharingData: SharingDataService) {
    
  }  

	getPartes(): void{

     

  }

  getDatas():void{

    this.dataService.getPartes().subscribe((data) => {
          //DESCARGAMOS LOS RECURSOS
          if(this.valor === undefined || this.valor === ''){
            this.partes = data['partes'];

            for(let i in data['partes']){

            this.partes[i]['recursoParte'] = this.dataService
            .getConversRecursos(data, data['partes'][i]['recursoParte']);

            this.partes[i]['clienteParte'] = this.dataService
            .getConversClientes(data, data['partes'][i]['clienteParte']); 

            this.partes[i]['tipoParte'] = this.dataService
            .getConversTipos(data, data['partes'][i]['tipoParte']);                
            }
          }else{

            switch (this.filtro) {

              case "recurso":

                var partes = this.dataService.getFilterPartesRecurso(data,this.valor);

                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(data, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(data, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(data, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0];  

              break;

              case "tipo":

                var partes = this.dataService.getFilterPartesTipo(data,this.valor);

                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(data, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(data, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(data, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0];  
                
              break;

              case "cliente":

                var partes = this.dataService.getFilterPartesCliente(data,this.valor);

                for(let i in partes[0]){

                  partes[0][i]['recursoParte'] = this.dataService
                  .getConversRecursos(data, partes[0][i]['recursoParte']);

                  partes[0][i]['clienteParte'] = this.dataService
                  .getConversClientes(data, partes[0][i]['clienteParte']);  

                  partes[0][i]['tipoParte'] = this.dataService
                  .getConversTipos(data, partes[0][i]['tipoParte']);                 
                }  
                this.partes = partes[0];  
                
              break;
            }   
          
        }
      },
      (error) => {
          console.log(error);
      }); 
  }


}
